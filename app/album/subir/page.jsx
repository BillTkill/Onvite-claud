"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Icon from "@/components/Icon";
import LangSelect from "@/components/LangSelect";
import { useI18n } from "@/components/I18nProvider";

// Public guest upload view — no account. Files are uploaded to /api/upload and
// registered on the couple's album via /api/album (event found by ?e=<slug>).
const PER_GUEST_LIMIT = 30;

export default function AlbumUploadPage() {
  return (
    <Suspense fallback={null}>
      <AlbumUploadInner />
    </Suspense>
  );
}

function AlbumUploadInner() {
  const { t } = useI18n();
  const params = useSearchParams();
  const slug = params.get("e") || "";

  const [name, setName] = useState("");
  const [files, setFiles] = useState([]); // File objects
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onPick = (e) => {
    setError("");
    const picked = Array.from(e.target.files || []).slice(0, PER_GUEST_LIMIT);
    setFiles(picked);
  };

  async function submit() {
    if (files.length === 0) return;
    if (!slug) { setError(t("album.noEvent")); return; }
    setUploading(true);
    setError("");
    try {
      const urls = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await up.json();
        if (data.ok && data.url) urls.push(data.url);
      }
      if (urls.length === 0) throw new Error("upload");
      const res = await fetch("/api/album", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, uploaderName: name, urls }),
      });
      const result = await res.json();
      if (!result.ok) throw new Error("save");
      setDone(true);
    } catch {
      setError(t("album.uploadError"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="auth-screen" style={{ flexDirection: "column", gap: 16 }}>
      <div style={{ width: "100%", maxWidth: 420, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--brand700)" }}>Onvite</Link>
        <LangSelect />
      </div>

      <div className="auth-card" style={{ maxWidth: 420 }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <span style={{ width: 64, height: 64, borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Icon name="checkCircle" size={34} />
            </span>
            <h1 className="serif" style={{ fontSize: 26, fontWeight: 700, color: "#1c1917" }}>{t("album.thanksTitle")}</h1>
            <p style={{ color: "#6b7280", marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>{t("album.thanksBody")}</p>
            <button onClick={() => { setDone(false); setFiles([]); setName(""); }} className="share-btn" style={{ marginTop: 20, display: "inline-block" }}>
              {t("album.uploadMore")}
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "var(--brand600)" }}>{t("album.eventEyebrow")}</p>
              <h1 className="serif" style={{ fontSize: 24, fontWeight: 700, color: "#1c1917" }}>{t("album.title")}</h1>
              <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14, lineHeight: 1.5 }}>{t("album.subtitle")}</p>
            </div>

            <label htmlFor="album-files" style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, border: "2px dashed var(--brand200)", borderRadius: 16, padding: "28px 16px", cursor: "pointer", background: "linear-gradient(120deg,rgba(240,230,212,.35),#fff)", color: "var(--gold-deep)", textAlign: "center" }}>
              <Icon name="camera" size={30} />
              <span style={{ fontWeight: 700, fontSize: 15, color: "#1c1917" }}>{t("album.pickTitle")}</span>
              <span style={{ fontSize: 12, color: "#6b7280" }}>{t("album.pickHint", { n: PER_GUEST_LIMIT })}</span>
              <input id="album-files" type="file" accept="image/*,video/*" multiple onChange={onPick} style={{ display: "none" }} />
            </label>

            {files.length > 0 && (
              <div style={{ marginTop: 12, border: "1px solid var(--brand100)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, color: "#15803d", background: "#f0fdf4" }}>
                <Icon name="check" size={16} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{t("album.selectedCount", { n: files.length })}</span>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}>{t("album.nameLabel")}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("album.namePh")} className="auth-field" style={{ marginTop: 6 }} />
            </div>

            {error && <p style={{ marginTop: 12, fontSize: 13, color: "var(--danger)" }}>{error}</p>}

            <button
              onClick={submit}
              disabled={files.length === 0 || uploading}
              className="share-btn share-btn--wa"
              style={{ marginTop: 20, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, border: "none", padding: "12px 16px", fontSize: 15, opacity: files.length === 0 || uploading ? 0.55 : 1, cursor: files.length === 0 || uploading ? "not-allowed" : "pointer" }}
            >
              <Icon name="upload" size={16} /> {uploading ? t("album.uploading") : t("album.submit")}
            </button>

            <p style={{ marginTop: 14, fontSize: 11, color: "#9ca3af", textAlign: "center" }}>{t("album.footnote")}</p>
          </>
        )}
      </div>
    </div>
  );
}
