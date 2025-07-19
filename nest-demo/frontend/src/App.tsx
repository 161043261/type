import { Button, Input, InputLabel } from '@mui/material';
import { useRef, useState, type ChangeEvent } from 'react';

function App() {
  const defaultCaptchaUrl = '/api/user/captcha';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaUrl, setCaptchaUrl] = useState(defaultCaptchaUrl);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setCaptchaUrl(defaultCaptchaUrl + '?' + Math.random());
  };

  const handleSubmit = () => {
    fetch('/api/user/user', {
      method: 'post',
      body: JSON.stringify({ username, password, captcha }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const handleUpload = () => {
    if (!fileRef.current || !fileRef.current.files) {
      return;
    }
    const formData = new FormData();
    formData.append('fileEntity', fileRef.current.files[0]);
    fetch('/api/upload/sf', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const handleDownload = () => open('http://localhost:3000/upload/download');

  const handleDownloadStream = async () => {
    const buf = await fetch('/api/upload/tar').then((res) => res.arrayBuffer());
    const blob = new Blob([buf]);
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.download = 'latestFile.zip';
    aTag.click();
  };

  return (
    <>
      <InputLabel>
        username
        <Input
          value={username}
          onInput={(ev: ChangeEvent<HTMLInputElement>) =>
            setUsername(ev.target.value)
          }
        />
      </InputLabel>

      <InputLabel>
        password
        <Input
          value={password}
          onInput={(ev: ChangeEvent<HTMLInputElement>) =>
            setPassword(ev.target.value)
          }
        ></Input>
      </InputLabel>

      <InputLabel>
        captcha
        <Input
          value={captcha}
          onInput={(ev: ChangeEvent<HTMLInputElement>) =>
            setCaptcha(ev.target.value)
          }
        ></Input>
      </InputLabel>

      <img src={captchaUrl} onClick={handleClick} />
      <Button onClick={handleSubmit}>submit</Button>

      <Input type="file" inputRef={fileRef} />
      <Button onClick={handleUpload}>Upload</Button>
      <Button onClick={handleDownload}>Download</Button>
      <Button onClick={handleDownloadStream}>DownloadStream</Button>
    </>
  );
}

export default App;
