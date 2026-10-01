import { useState, useRef } from 'react'
// import { Upload, Download, SquareX } from 'lucide-react';
import Button from '../feature/Button.tsx'


const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  // 1. Fungsi memicu klik input file tersembunyi
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 2. Fungsi menangani perubahan file saat user memilih file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      alert(`File "${file.name}" berhasil diunggah (simulasi)!`);
      // Di sini Anda bisa menambahkan logika upload ke server/API (misal via axios/fetch)
    }
  };

  // 3. Efek visual saat file diseret di atas area drop
  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.type === "dragenter" || event.type === "dragover") {
      setIsDragActive(true);
    } else if (event.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // 4. Menangkap file saat dilepas (dropped)
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Di sini Anda bisa langsung memanggil fungsi upload ke server
      alert(`File "${file.name}" siap diunggah!`);
    }
  };

  // 3. Fungsi untuk mengunduh file sampel
  const handleDownload = () => {
    // Contoh konten file teks (bisa diganti URL file asli dari server)
    const fileContent = "Ini adalah isi file contoh yang diunduh.";
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Membuat elemen link sementara di memori
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contoh-dokumen.txt'; // Nama file hasil unduhan
    document.body.appendChild(link);
    link.click();
    
    // Bersihkan memori dan hapus elemen
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <nav className="flex absolute justify-center items-center h-16 w-full z-50 bg-[#0f0f0f]">
        <div className="flex justify-center items-center bg-[#0f0f0f] text-white">
          <h1 className="text-2xl font-bold">Face Recognition GUI</h1>
        </div>
      </nav>
      <div className="flex justify-center h-screen gap-6  bg-[#353535] text-white">
        {/* sisi kiri / uploads */}
        <div className="bg-[#353535] flex flex-col w-full mt-16 p-4">
          <div 
            className={`flex justify-center items-center gap-4 p-4 w-full h-4/5 rounded-lg ${isDragActive ? 'bg-blue-500' : 'bg-gray-800'}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className={`flex justify-center w-full h-full items-center border-8 border-dashed text-2xl font-bold ${isDragActive ? 'border-blue-500' : 'border-gray-500'}`}>
              <p>Drop your file here</p>
            </div>
          </div>
                  {/* PREVIEW FILE TERPILIH */}
        {selectedFile && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="text-xl">📄</span>
              <div className="truncate">
                <p className="font-medium text-gray-700 truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            {/* Tombol Hapus Batal */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Mencegah memicu klik area drop
                setSelectedFile(null);
              }}
              className="text-gray-400 hover:text-red-500 transition"
              title="Hapus berkas"
            >
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
          <div className="flex justify-start">
            <div className="mt-4">
              <Button onClick={handleUploadClick}>Upload File</Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                />
              {selectedFile && (
                <div className="">
                  <p>File yang dipilih: {selectedFile.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* sisi kanan / result */}
        <div className="bg-[#353535] flex flex-col w-full mt-16  p-4">
          <div className="flex gap-4 p-4 bg-gray-800 w-full h-4/5 rounded-lg">
            <div className={`flex justify-center w-full h-full items-center border-8 border-dashed text-2xl font-bold ${isDragActive ? 'border-blue-500' : 'border-gray-500'}`}>
              
            </div>
          </div>
          <div className="flex gap-2 p-2">
            <div className="mt-4" >
              <Button onClick={handleDownload}>Download Sample File</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App
