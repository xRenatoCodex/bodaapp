'use client'

import { useCallback } from "react";
import styles from "./page.module.css";
import UploadIcon from '@/app/ui/uploadicon'

import { useRouter } from 'next/navigation'
 



export default function Home() {

  const router = useRouter()

  const upload_function = useCallback(async (event) => {

    const token = await (await fetch('https://shark-app-qyghd.ondigitalocean.app/api/google/oauth/get_token')).text()
    event.preventDefault();
    const fileInput = event.target;
    const selectedFiles = fileInput.files;
    // Check if any files are selected
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    // Append each selected file to the FormData object
    for (let i of selectedFiles) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "image/" + i.name.split(".")[1]);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: i,
        redirect: "follow"
      }
      const respuesta = await (await fetch("https://www.googleapis.com/upload/drive/v3/files", requestOptions)).json();
      const myHeaders_change = new Headers();
      myHeaders_change.append("Authorization", "Bearer " + token);
      myHeaders_change.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "name": i.name.split(".")[0]
      });
      const requestOptions_change = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      fetch("https://content.googleapis.com/drive/v3/files/" + respuesta.id, requestOptions_change)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      router.push('/uploaded', { scroll: false })


    }

  }, [])
  return (
    <main className={styles.main}>

      <div style={{ height: 164, width: 164, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <UploadIcon height={120}></UploadIcon>
        <form id="uploadForm" encType="multipart/form-data" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>

          <input type="file" id="fileInput" name="files[]" multiple accept="image/*,video/*" style={{ width: '100%', height: '100%', opacity: 0 }} onChange={upload_function} />


        </form>
      </div>

    </main>
  );
}

