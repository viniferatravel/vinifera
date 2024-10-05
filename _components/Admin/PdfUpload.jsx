'use client'
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/config";

const PdfUpload = ({ selectedPack, onSetDownloadURL }) => {
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState(selectedPack?.package_pdf === "" || selectedPack?.package_pdf === undefined ? "" : selectedPack?.package_pdf);
    const [changePdf, setChangePdf] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;

        const storageRef = ref(storage, `pdfs/${selectedPack?.package_id + "-" + selectedPack?.package_name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Optional: You can show upload progress here
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDownloadURL(url);
                    onSetDownloadURL(url)
                    // console.log("File available at", url);
                });
            }
        );
    };

    const handleDownload = async () => {
        const url = downloadURL;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const a = document.createElement('a');
            const objectURL = URL.createObjectURL(blob);
            a.href = objectURL;
            a.download = `${selectedPack?.package_name}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectURL);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleChangePdf = () => {
        setChangePdf(true)
    }

    return (
        <div className="flex flex-col items-left space-y-4">
            {selectedPack?.package_pdf === "" || selectedPack?.package_pdf === undefined || changePdf === true
                ? <>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} />
                    <button
                        type="button"
                        onClick={handleUpload}
                        className="px-4 py-2 bg-blue-600 text-white rounded w-32"
                    >
                        Upload PDF
                    </button>
                    {downloadURL && (
                        <div>
                            <p>file is ready for download:</p>
                            <button
                                type="button"
                                onClick={handleDownload}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Download PDF
                            </button>
                        </div>
                    )}
                </>
                :
                <div>
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="px-4 py-2 bg-green-600 text-white rounded w-48"
                    >
                        Download PDF
                    </button>
                    <a
                        type="button"
                        onClick={handleChangePdf}
                        className="ml-2 px-4 py-2 w-32"
                    >
                        Change PDF
                    </a>
                </div>
            }

            {/* {
                changePdf === true
                    ? <>
                        <input type="file" accept="application/pdf" onChange={handleFileChange} />
                        <button
                            type="button"
                            onClick={handleUpload}
                            className="px-4 py-2 bg-blue-600 text-white rounded w-32"
                        >
                            Upload PDF
                        </button>
                        {downloadURL && (
                            <div>
                                <p>file is ready for download:</p>
                                <button
                                    type="button"
                                    onClick={handleDownload}
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    Download PDF
                                </button>
                            </div>
                        )}
                    </>
                    : ""
            } */}
        </div>


    );
};

export default PdfUpload;
