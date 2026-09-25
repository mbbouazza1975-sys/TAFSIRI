// Vérifie que la police Warsh (KFGQPC) s'affiche réellement sur cet appareil.
// Sur certains téléphones, la police se charge mais ses lettres restent invisibles :
// on ne l'active (classe html.warsh-font-ok) que si un test de dessin produit bien de l'encre.
// En cas de doute ou d'erreur, on garde Amiri — le texte reste toujours lisible.

const SAMPLE = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ';

function inkPixels(font: string): number {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;
  ctx.font = font;
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(SAMPLE, 160, 50);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let count = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 64) count++;
  }
  return count;
}

// iPhone / iPad (tous les navigateurs iOS utilisent WebKit) et Safari sur Mac :
// police Warsh signalée invisible sur iPhone → on garde Amiri, sans dépendre du test.
function isAppleWebKit(): boolean {
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const macSafari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS|Android/.test(ua);
  return iOS || macSafari;
}

export async function checkWarshFont(): Promise<void> {
  const root = document.documentElement;
  try {
    if (isAppleWebKit()) return; // Amiri sur iPhone/iPad/Safari
    if (!('fonts' in document)) return;
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000));
    const faces = await Promise.race([document.fonts.load('48px "KFGQPC Warsh"', SAMPLE), timeout]);
    if (!faces || faces.length === 0) return; // police non chargée → Amiri
    const ink = inkPixels('48px "KFGQPC Warsh"');
    if (ink > 300) {
      root.classList.add('warsh-font-ok');
    } else {
      console.warn('[Police] KFGQPC Warsh chargée mais invisible sur cet appareil → Amiri');
    }
  } catch {
    // Échec ou délai dépassé : on reste sur Amiri
  }
}
