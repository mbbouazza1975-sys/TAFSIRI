import React, { useState, useEffect } from 'react';
import { Settings, Download, Trash2, Smartphone, HardDrive, Volume2, Type, Check, RefreshCw, Upload, Sparkles, Palette, ExternalLink, Copy, Globe } from 'lucide-react';
import { UserSettings, UserProgress } from '../types';
import { WARSH_RECITERS, getSurahAudioUrl } from '../data/reciters';
import { clearAudioCache, getAllCachedAudios, exportUserData, importUserData } from '../services/storage';
import { promptPwaInstall, subscribeToInstallPrompt, forcePurgeCacheAndReload } from '../services/pwa';
import { useAudio } from '../context/AudioContext';

interface SettingsViewProps {
  settings: UserSettings;
  progress: UserProgress;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onResetProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  progress,
  onUpdateSettings,
  onResetProgress
}) => {
  const { setReciter } = useAudio();
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [cachedAudiosCount, setCachedAudiosCount] = useState(0);
  const [cachedSizeBytes, setCachedSizeBytes] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sharedAppUrl = "https://ais-pre-ob5ypvtzkwap543nvzuhdm-298830929278.europe-west2.run.app";
  const devAppUrl = "https://ais-dev-ob5ypvtzkwap543nvzuhdm-298830929278.europe-west2.run.app";

  const handleCopyUrl = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  useEffect(() => {
    const unsub = subscribeToInstallPrompt(can => setCanInstallPwa(can));
    loadCacheStats();
    return unsub;
  }, []);

  const loadCacheStats = async () => {
    const records = await getAllCachedAudios();
    setCachedAudiosCount(records.length);
    const totalBytes = records.reduce((acc, r) => acc + (r.sizeBytes || 0), 0);
    setCachedSizeBytes(totalBytes);
  };

  const handleClearCache = async () => {
    if (confirm('Voulez-vous vraiment vider le cache des fichiers audio hors-ligne ?')) {
      await clearAudioCache();
      await loadCacheStats();
    }
  };

  const handleInstallPwa = async () => {
    await promptPwaInstall();
  };

  const handleExportData = async () => {
    setIsExporting(true);
    const jsonStr = await exportUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `juz_amma_warsh_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsExporting(false);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async event => {
      const content = event.target?.result as string;
      const ok = await importUserData(content);
      if (ok) {
        setImportMessage('Données importées avec succès ! Rechargez la page.');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setImportMessage('Erreur lors de la lecture du fichier de sauvegarde.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28">
      {/* Header */}
      <div className="w-full rounded-3xl bg-[#1F4D3D] text-[#FAF6EC] p-5 sm:p-7 border border-[#C9A24B]/30 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B] text-[#14332A] text-xs font-bold uppercase tracking-wider shadow-sm">
          <Settings className="w-3.5 h-3.5" />
          <span>Paramètres & Préférences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Configuration de votre Application
        </h1>
        <p className="text-xs sm:text-sm text-[#FAF6EC]/80 leading-relaxed">
          Personnalisez votre récitateur Warsh, la taille de la calligraphie, le mode hors-ligne et vos données locales.
        </p>
      </div>

      {/* 1. PWA Installation Section */}
      <div className="w-full rounded-3xl p-6 bg-white dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14332A] text-[#C9A24B] flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              Application Mobile & Installation PWA
            </h2>
            <p className="text-xs text-stone-500">
              Installez l'application sur votre écran d'accueil pour un accès instantané sans barre de navigateur.
            </p>
          </div>
        </div>

        {canInstallPwa ? (
          <button
            onClick={handleInstallPwa}
            className="w-full py-3 rounded-2xl bg-[#C9A24B] text-[#14332A] font-extrabold text-sm hover:bg-[#d8b056] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Installer l'application sur cet appareil</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-2">
            <p className="font-semibold text-[#14332A] dark:text-[#FAF6EC]">
              Pour installer sur iPhone / iPad (iOS Safari) :
            </p>
            <p>1. Touchez le bouton Partager <span className="font-bold">⎋</span> en bas de Safari.</p>
            <p>2. Faites défiler et sélectionnez <span className="font-bold">« Sur l'écran d'accueil »</span>.</p>
            <p className="text-[11px] text-stone-400 pt-1">
              Sur Android / PC : Utilisez le menu de Chrome ou Edge « Installer l'application ».
            </p>
          </div>
        )}
      </div>

      {/* 2. App Update & URLs Section */}
      <div className="w-full rounded-3xl p-6 bg-white dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14332A] text-[#C9A24B] flex items-center justify-center shadow-xs">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              Adresses URL & Mise à Jour de l'Application
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Retrouvez les liens officiels de votre application et forcez la mise à jour si le cache de votre navigateur affiche une ancienne version.
            </p>
          </div>
        </div>

        {/* URLs Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Card 1: Shared Published App */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#14332A]/5 to-[#C9A24B]/10 dark:from-[#1F4D3D]/30 dark:to-[#14332A]/20 border-2 border-[#C9A24B]/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#C9A24B] text-[#14332A]">
                URL Publiée (Partagée)
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                En ligne
              </span>
            </div>
            <p className="text-xs font-bold text-[#14332A] dark:text-[#FAF6EC]">
              Lien public pour vos utilisateurs et votre mobile :
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 font-mono text-[11px] text-stone-700 dark:text-stone-300 break-all select-all">
              {sharedAppUrl}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleCopyUrl(sharedAppUrl, 'shared')}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#C9A24B] text-[#14332A] text-xs font-bold hover:bg-[#d8b056] transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                {copiedKey === 'shared' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'shared' ? 'Lien copié !' : 'Copier l\'adresse'}</span>
              </button>
              <a
                href={sharedAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ouvrir</span>
              </a>
            </div>
          </div>

          {/* Card 2: Development Preview App */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200">
                URL Preview (Développement)
              </span>
              <span className="text-xs font-semibold text-blue-500 dark:text-blue-400">
                Mises à jour instantanées
              </span>
            </div>
            <p className="text-xs font-bold text-[#14332A] dark:text-[#FAF6EC]">
              Lien direct de prévisualisation de travail :
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 font-mono text-[11px] text-stone-700 dark:text-stone-300 break-all select-all">
              {devAppUrl}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleCopyUrl(devAppUrl, 'dev')}
                className="flex-1 py-1.5 px-3 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-300 transition-all flex items-center justify-center gap-1.5"
              >
                {copiedKey === 'dev' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'dev' ? 'Lien copié !' : 'Copier l\'adresse'}</span>
              </button>
              <a
                href={devAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ouvrir</span>
              </a>
            </div>
          </div>
        </div>

        {/* Cache Invalidation & Force Update Box */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300/70 dark:border-amber-900/50 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A24B] animate-ping"></span>
                <span className="font-extrabold text-xs text-[#14332A] dark:text-[#FAF6EC]">
                  Pourquoi l'ancienne version s'affiche-t-elle après un « Publish » ?
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Votre navigateur (surtout Chrome ou Safari sur smartphone) garde en cache les fichiers pour le mode hors-ligne PWA. Si vous venez de publier une mise à jour, cliquez sur le bouton ci-contre pour effacer l'ancien cache et charger immédiatement la dernière version.
              </p>
            </div>

            <button
              onClick={() => forcePurgeCacheAndReload()}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#14332A] text-[#FAF6EC] hover:bg-[#1F4D3D] text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 border border-[#C9A24B]"
            >
              <RefreshCw className="w-4 h-4 text-[#C9A24B]" />
              <span>Forcer l'actualisation (Vider le cache)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Reciter Selection */}
      <div className="w-full rounded-3xl p-6 bg-white dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14332A] text-[#C9A24B] flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              Récitateur Warsh par Défaut
            </h2>
            <p className="text-xs text-stone-500">
              Récitateurs Warsh 'an Nâfi' dont la voix est disponible verset par verset.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WARSH_RECITERS.map(reciter => {
            const isSelected = settings.preferredReciterId === reciter.id;
            return (
              <div
                key={reciter.id}
                onClick={() => {
                  onUpdateSettings({ ...settings, preferredReciterId: reciter.id });
                  setReciter(reciter.id);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-[#1F4D3D]/10 dark:bg-[#1F4D3D]/40 border-[#C9A24B] ring-1 ring-[#C9A24B]'
                    : 'border-[#14332A]/10 dark:border-stone-800 hover:border-[#C9A24B]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#14332A] dark:text-[#FAF6EC]">
                    {reciter.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#C9A24B]" />}
                </div>
                <p className="font-quran text-sm text-[#C9A24B]">{reciter.subname}</p>
                <p className="text-xs text-stone-500 leading-relaxed">{reciter.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spiritual Themes Selector: Parchemin, Nuit, Émeraude */}
      <div className="w-full rounded-3xl p-6 bg-white dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14332A] text-[#C9A24B] flex items-center justify-center shadow-sm">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              Thèmes & Atmosphère Spirituelle
            </h2>
            <p className="text-xs text-stone-500">
              Choisissez une palette chromatique noble adaptée à votre temps de lecture et révision.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {[
            {
              id: 'parchemin',
              name: 'Parchemin Sacré',
              desc: 'Teinte ivoire chaude, encres douces et dorures inspirées des manuscrits andalous.',
              bgBadge: 'bg-[#F5EFE0] text-[#1B382D] border-[#C9A24B]/60'
            },
            {
              id: 'nuit',
              name: 'Nuit & Méditation',
              desc: 'Fond noir profond et calligraphie contrastée, idéal pour les révisions nocturnes (Qiyam).',
              bgBadge: 'bg-[#0B1310] text-[#FAF6EC] border-stone-700'
            },
            {
              id: 'emeraude',
              name: 'Émeraude & Or',
              desc: 'Vert impérial profond, reflets d’or brossé et solennité spirituelle du Coran.',
              bgBadge: 'bg-[#0D261E] text-[#FAF6EC] border-[#C9A24B]'
            }
          ].map(themeItem => {
            const isSelected = settings.theme === themeItem.id;
            return (
              <button
                key={themeItem.id}
                onClick={() => onUpdateSettings({ ...settings, theme: themeItem.id as any })}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-[#C9A24B] ring-2 ring-[#C9A24B]/40 bg-stone-50 dark:bg-stone-900/60 shadow-md'
                    : 'border-stone-200 dark:border-stone-800 hover:border-[#C9A24B]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${themeItem.bgBadge}`}>
                      {themeItem.name}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#C9A24B] text-[#14332A] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-medium">
                    {themeItem.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Typography & Font Size Slider */}
      <div className="w-full rounded-3xl p-6 bg-white dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14332A] text-[#C9A24B] flex items-center justify-center">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              Taille de la Calligraphie Arabe
            </h2>
            <p className="text-xs text-stone-500">
              Ajustez la taille du texte pour un confort de lecture optimal sur votre écran.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400">
            <span>Petite (24px)</span>
            <span className="text-[#C9A24B]">{settings.arabicFontSize} px</span>
            <span>Très grande (44px)</span>
          </div>

          <input
            type="range"
            min="24"
            max="44"
            step="2"
            value={settings.arabicFontSize}
            onChange={e => onUpdateSettings({ ...settings, arabicFontSize: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C9A24B]"
          />

          {/* Preview Box */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-center w-full">
            <p
              dir="rtl"
              style={{ fontSize: `${settings.arabicFontSize}px`, lineHeight: 2 }}
              className="font-quran text-[#14332A] dark:text-[#FAF6EC]"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-xs text-stone-500 mt-1 italic">
              Exemple d'affichage en taille réelle
            </p>
          </div>
        </div>
      </div>

      {/* 4. Offline Storage Management */}
      <div className="w-full rounded-3xl p-6 bg-white dark:bg-[#16221C] border border-[#14332A]/10 dark:border-stone-800 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14332A] text-[#C9A24B] flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              Gestion du Stockage Hors-Ligne (IndexedDB)
            </h2>
            <p className="text-xs text-stone-500">
              Contrôlez les sourates pré-téléchargées et l'espace mémoire utilisé.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="font-bold text-sm text-[#14332A] dark:text-[#FAF6EC] block">
              {cachedAudiosCount} sourate{cachedAudiosCount > 1 ? 's' : ''} en mémoire hors-ligne
            </span>
            <span className="text-xs text-stone-500">
              Espace occupé : {(cachedSizeBytes / (1024 * 1024)).toFixed(2)} Mo
            </span>
          </div>

          <button
            onClick={handleClearCache}
            disabled={cachedAudiosCount === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold disabled:opacity-40 hover:bg-rose-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vider le cache</span>
          </button>
        </div>

        {/* Export / Import Data */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-bold hover:bg-stone-200 flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter ma progression (Sauvegarde JSON)</span>
            </button>

            <label className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-bold hover:bg-stone-200 flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Restaurer une sauvegarde</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>

          {importMessage && (
            <p className="text-xs font-semibold text-emerald-600 text-center">{importMessage}</p>
          )}
        </div>
      </div>

      {/* 5. Export Project for Free Web Hosting (Vercel, Cloudflare, etc.) */}
      <div className="w-full rounded-3xl p-6 bg-gradient-to-br from-[#14332A]/5 via-white to-amber-500/5 dark:from-[#16221C] dark:to-stone-900 border-2 border-[#C9A24B]/30 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C9A24B] text-[#14332A] flex items-center justify-center shadow-sm">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#14332A] dark:text-[#FAF6EC]">
              Exporter le Projet pour Hébergement Gratuit (Vercel, Cloudflare, etc.)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Téléchargez l'application prête à être mise en ligne gratuitement et sans limite de crédit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Card 1: Built dist ready for deployment */}
          <a
            href="/juz-amma-site-pre-a-publier.zip"
            download="juz-amma-site-pre-a-publier.zip"
            className="flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-[#16221C] border border-[#C9A24B]/40 hover:border-[#C9A24B] transition-all shadow-sm group hover:shadow-md"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Prêt en 30 sec
                </span>
                <span className="text-xs font-mono text-stone-400">274 Ko</span>
              </div>
              <h3 className="font-extrabold text-sm text-[#14332A] dark:text-[#FAF6EC] group-hover:text-[#C9A24B] transition-colors">
                Site Compilé (Prêt à publier)
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Compatible <b>Vercel</b>, <b>Cloudflare Pages</b>, <b>Surge.sh</b> ou <b>Tiiny.host</b> (glisser-déposer sans configuration).
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#C9A24B]">
              <Download className="w-4 h-4" />
              <span>Télécharger le ZIP compilé</span>
            </div>
          </a>

          {/* Card 2: Full Source code */}
          <a
            href="/juz-amma-source.zip"
            download="juz-amma-source.zip"
            className="flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-[#16221C] border border-stone-200 dark:border-stone-800 hover:border-[#C9A24B] transition-all shadow-sm group hover:shadow-md"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                  Code Source
                </span>
                <span className="text-xs font-mono text-stone-400">185 Ko</span>
              </div>
              <h3 className="font-extrabold text-sm text-[#14332A] dark:text-[#FAF6EC] group-hover:text-[#C9A24B] transition-colors">
                Sources Complètes (GitHub / Vercel)
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Tout le code source configuré avec <b>vercel.json</b> et <b>netlify.toml</b> inclus.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#14332A] dark:text-[#FAF6EC] group-hover:text-[#C9A24B] transition-colors">
              <Download className="w-4 h-4" />
              <span>Télécharger les sources (ZIP)</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
