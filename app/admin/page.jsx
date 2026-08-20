"use client";

import { useEffect, useRef, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";
import "../styles/admin.css";

export default function AdminPage() {
    const [authChecked, setAuthChecked] = useState(false);
    const [user, setUser] = useState(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const [members, setMembers] = useState([]);
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!isFirebaseConfigured) {
            setAuthChecked(true);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthChecked(true);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isFirebaseConfigured || !user) return;
        const q = query(collection(db, "team"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMembers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsubscribe();
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setLoginLoading(true);
        try {
            await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
        } catch (err) {
            setLoginError("Login failed — check the email and password and try again.");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = () => signOut(auth);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name.trim() || !file) {
            setUploadError("Add both a name and a photo.");
            return;
        }
        setUploadError("");
        setUploading(true);
        try {
            const { url, publicId } = await uploadToCloudinary(file);
            const maxOrder = members.reduce((max, m) => Math.max(max, m.order || 0), 0);
            await addDoc(collection(db, "team"), {
                name: name.trim(),
                photoUrl: url,
                cloudinaryId: publicId,
                order: maxOrder + 1,
                createdAt: serverTimestamp(),
            });
            setName("");
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            setUploadError("Upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (member) => {
        if (!confirm(`Remove ${member.name} from the team section? (Their photo will stay in your Cloudinary media library — delete it there separately if you want it fully gone.)`)) return;
        try {
            await deleteDoc(doc(db, "team", member.id));
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    const handleMove = async (index, direction) => {
        const target = index + direction;
        if (target < 0 || target >= members.length) return;
        const a = members[index];
        const b = members[target];
        try {
            await Promise.all([
                updateDoc(doc(db, "team", a.id), { order: b.order }),
                updateDoc(doc(db, "team", b.id), { order: a.order }),
            ]);
        } catch (err) {
            alert("Reorder failed: " + err.message);
        }
    };

    const startEdit = (member) => {
        setEditingId(member.id);
        setEditValue(member.name);
    };

    const saveEdit = async (member) => {
        const trimmed = editValue.trim();
        if (trimmed && trimmed !== member.name) {
            try {
                await updateDoc(doc(db, "team", member.id), { name: trimmed });
            } catch (err) {
                alert("Rename failed: " + err.message);
            }
        }
        setEditingId(null);
    };

    if (!isFirebaseConfigured) {
        return (
            <main className="admin-page">
                <div className="admin-card admin-card--narrow">
                    <h1>Admin — not connected yet</h1>
                    <p>
                        This page manages team photos through Firebase, but no Firebase project
                        is wired up yet. Create a project at{" "}
                        <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer">
                            console.firebase.google.com
                        </a>
                        , enable <strong>Authentication</strong> (Email/Password provider) and{" "}
                        <strong>Firestore</strong>, then add its config to <code>.env.local</code>{" "}
                        (see <code>.env.local.example</code> in the project root) and restart the
                        dev server.
                    </p>
                </div>
            </main>
        );
    }

    if (!authChecked) {
        return (
            <main className="admin-page">
                <p className="admin-loading">Loading…</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="admin-page">
                <form className="admin-card admin-card--narrow" onSubmit={handleLogin}>
                    <h1>Admin login</h1>
                    <label className="admin-field">
                        <span>Email</span>
                        <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </label>
                    <label className="admin-field">
                        <span>Password</span>
                        <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </label>
                    {loginError && <p className="admin-error">{loginError}</p>}
                    <button type="submit" className="admin-btn" disabled={loginLoading}>
                        {loginLoading ? "Signing in…" : "Sign in"}
                    </button>
                    <p className="admin-hint">
                        Accounts are created in the Firebase console (Authentication → Users) —
                        there's no public sign-up here on purpose.
                    </p>
                </form>
            </main>
        );
    }

    if (!isCloudinaryConfigured) {
        return (
            <main className="admin-page">
                <div className="admin-header">
                    <h1>Team photos</h1>
                    <button className="admin-btn admin-btn--ghost" onClick={handleLogout}>
                        Log out ({user.email})
                    </button>
                </div>
                <div className="admin-card admin-card--narrow">
                    <h2>Cloudinary — not connected yet</h2>
                    <p>
                        Photo uploads go through Cloudinary. Create a free account at{" "}
                        <a href="https://cloudinary.com/users/register/free" target="_blank" rel="noreferrer">
                            cloudinary.com
                        </a>
                        , copy your <strong>Cloud name</strong> from the dashboard, then go to{" "}
                        <strong>Settings → Upload → Upload presets → Add upload preset</strong>,
                        set <strong>Signing Mode</strong> to <strong>Unsigned</strong>, and save.
                        Add both values to <code>.env.local</code> as{" "}
                        <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> and{" "}
                        <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code>, then restart the dev
                        server.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="admin-page">
            <div className="admin-header">
                <h1>Team photos</h1>
                <button className="admin-btn admin-btn--ghost" onClick={handleLogout}>
                    Log out ({user.email})
                </button>
            </div>

            <form className="admin-card" onSubmit={handleAdd}>
                <h2>Add a team member</h2>
                <label className="admin-field">
                    <span>Name</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jamie Rivera"
                    />
                </label>
                <label className="admin-field">
                    <span>Photo</span>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </label>
                {uploadError && <p className="admin-error">{uploadError}</p>}
                <button type="submit" className="admin-btn" disabled={uploading}>
                    {uploading ? "Uploading…" : "Add to team section"}
                </button>
            </form>

            <div className="admin-card">
                <h2>Current team ({members.length})</h2>
                {members.length === 0 && <p className="admin-hint">No team members yet.</p>}
                <ul className="admin-list">
                    {members.map((member, i) => (
                        <li key={member.id} className="admin-list-row">
                            <img src={member.photoUrl} alt={member.name} className="admin-thumb" />
                            <div className="admin-list-name">
                                {editingId === member.id ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        autoFocus
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => saveEdit(member)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") saveEdit(member);
                                            if (e.key === "Escape") setEditingId(null);
                                        }}
                                    />
                                ) : (
                                    <span onClick={() => startEdit(member)} title="Click to rename">
                                        {member.name}
                                    </span>
                                )}
                            </div>
                            <div className="admin-list-actions">
                                <button
                                    type="button"
                                    className="admin-btn admin-btn--icon"
                                    onClick={() => handleMove(i, -1)}
                                    disabled={i === 0}
                                    aria-label="Move up"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn--icon"
                                    onClick={() => handleMove(i, 1)}
                                    disabled={i === members.length - 1}
                                    aria-label="Move down"
                                >
                                    ↓
                                </button>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn--danger"
                                    onClick={() => handleDelete(member)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="admin-hint">
                    The first 4 members (by this order) appear in the featured collage on the
                    homepage; the rest show in a grid below it.
                </p>
            </div>
        </main>
    );
}
