import os
import zipfile

def main():
    # 1. Package dist into dist/juz-amma-site-pre-a-publier.zip
    dist_zip = 'dist/juz-amma-site-pre-a-publier.zip'
    if os.path.exists('dist'):
        with zipfile.ZipFile(dist_zip, 'w', zipfile.ZIP_DEFLATED) as z:
            for root, dirs, files in os.walk('dist'):
                for file in files:
                    if file.endswith('.zip'):
                        continue
                    abs_path = os.path.join(root, file)
                    rel_path = os.path.relpath(abs_path, 'dist')
                    z.write(abs_path, rel_path)
        print(f"[Build] Created {dist_zip} ({os.path.getsize(dist_zip)} bytes)")

        # Also copy to public/ so dev mode can download it
        if os.path.exists('public'):
            import shutil
            shutil.copyfile(dist_zip, 'public/juz-amma-site-pre-a-publier.zip')

    # 2. Package source code into dist/juz-amma-source.zip
    src_zip = 'dist/juz-amma-source.zip'
    if os.path.exists('dist'):
        with zipfile.ZipFile(src_zip, 'w', zipfile.ZIP_DEFLATED) as z:
            for root, dirs, files in os.walk('.'):
                dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist', '.git', '.cache')]
                for file in files:
                    if file.endswith('.zip'):
                        continue
                    abs_path = os.path.join(root, file)
                    rel_path = os.path.relpath(abs_path, '.')
                    z.write(abs_path, rel_path)
        print(f"[Build] Created {src_zip} ({os.path.getsize(src_zip)} bytes)")
        if os.path.exists('public'):
            import shutil
            shutil.copyfile(src_zip, 'public/juz-amma-source.zip')

if __name__ == '__main__':
    main()
