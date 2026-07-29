"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useI18n } from "@/components/I18nProvider";
import { setMusic, setMusicAutoplay, setMusicFile } from "@/app/panel/actions";

// Repertoire — song titles only (our sample catalogue).
const LIBRARY = [
  "Perfect — Ed Sheeran",
  "A Thousand Years — Christina Perri",
  "All of Me — John Legend",
  "Can't Help Falling in Love — Elvis Presley",
  "Marry Me — Train",
  "Thinking Out Loud — Ed Sheeran",
  "At Last — Etta James",
  "Make You Feel My Love — Adele",
  "Amazed — Lonestar",
  "I Get to Love You — Ruelle",
];

export default function MusicPanel({ view }) {
  const { t } = useI18n();
  const current = view.music || LIBRARY[0];
  const [selected, setSelected] = useState(current);
  const [autoplay, setAutoplay] = useState(view.musicAutoplay ?? true);
  const [, startTransition] = useTransition();

  // Persist the chosen song (optimistic; reverts on failure).
  function chooseSong(song) {
    const prev = selected;
    setSelected(song);
    startTransition(async () => {
      try {
        await setMusic(song);
      } catch {
        setSelected(prev);
      }
    });
  }

  function toggleAutoplay() {
    const next = !autoplay;
    setAutoplay(next);
    startTransition(async () => {
      try {
        await setMusicAutoplay(next);
      } catch {
        setAutoplay(!next);
      }
    });
  }

  // Pick an MP3 from the device: upload the file, then register it as the song.
  function onPickMusic(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const songName = file.name.replace(/\.[^.]+$/, "");
    setSelected(songName);
    startTransition(async () => {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await up.json();
        if (data.ok && data.url) await setMusicFile(data.url, songName);
      } catch {
        /* ignore */
      }
    });
  }

  return (
    <>
      <Link href="/panel" style={{ fontSize: 13, color: "var(--brand700)", fontWeight: 600 }}>← {t("panel.music.back")}</Link>

      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 14, color: "var(--brand600)" }}>{t("panel.music.eyebrow")}</p>
        <h1 className="serif" style={{ fontSize: "clamp(24px,4vw,30px)", fontWeight: 700, color: "#1c1917" }}>{t("panel.music.title")}</h1>
        <p style={{ color: "#4b5563", marginTop: 4, fontSize: 15 }}>{t("panel.music.subtitle")}</p>
      </div>

      {/* Current song */}
      <div
        className="pcard"
        style={{
          marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          background: "linear-gradient(120deg,rgba(240,230,212,.5),#fff)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              width: 46, height: 46, borderRadius: 14, flex: "none", background: "linear-gradient(140deg,#f5ecda,#e7d6b8)",
              color: "var(--gold-deep)", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name="music" size={22} />
          </span>
          <div>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "#9ca3af" }}>{t("panel.music.current")}</p>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#1c1917" }}>{selected}</p>
          </div>
        </div>
        {view.musicUrl ? (
          <audio controls src={view.musicUrl} style={{ height: 38, maxWidth: "100%" }} />
        ) : (
          <span className="share-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="play" size={14} /> {t("panel.music.preview")}
          </span>
        )}
      </div>

      {/* Autoplay toggle */}
      <div
        className="pcard"
        style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
      >
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, color: "#1c1917" }}>{t("panel.music.autoplayTitle")}</p>
          <p style={{ fontSize: 12, color: "#6b7280" }}>{t("panel.music.autoplayBody")}</p>
        </div>
        <button
          className="toggle-switch"
          data-on={autoplay}
          aria-pressed={autoplay}
          aria-label={t("panel.music.autoplayTitle")}
          onClick={toggleAutoplay}
        >
          <span />
        </button>
      </div>

      {/* Song library */}
      <div className="pcard" style={{ marginTop: 16, padding: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderBottom: "1px solid var(--brand100)", padding: "16px 20px" }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1c1917" }}>{t("panel.music.chooseTitle")}</h2>
        </div>
        <div>
          {LIBRARY.map((song, i) => {
            const on = song === selected;
            return (
              <button
                key={song}
                onClick={() => chooseSong(song)}
                style={{
                  width: "100%", textAlign: "left", background: on ? "var(--brand50)" : "transparent", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  padding: "14px 20px", borderBottom: i < LIBRARY.length - 1 ? "1px solid #faf6ee" : "none",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: on ? "var(--gold-deep)" : "#9ca3af" }}><Icon name="music" size={16} /></span>
                  <span style={{ fontWeight: 600, color: "#1c1917", fontSize: 14 }}>{song}</span>
                </span>
                {on && (
                  <span style={{ background: "var(--gold-soft)", color: "var(--gold-deep)", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                    {t("panel.music.selected")}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--brand100)" }}>
          <label className="share-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <Icon name="upload" size={15} /> {t("panel.music.uploadOwn")}
            <input type="file" accept="audio/*,.mp3" onChange={onPickMusic} style={{ display: "none" }} />
          </label>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>{t("panel.music.uploadHint")}</p>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 20, fontSize: 12 }}>{t("panel.music.footnote")}</p>
    </>
  );
}
