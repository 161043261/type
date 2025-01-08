# python -m venv ./venv

if [ "$OS" = "Windows_NT" ]; then
  vpython=./venv/Scripts/python
  vpip=./venv/Scripts/pip
else
  vpython=./venv/bin/python
  vpip=./venv/bin/pip
fi

${vpip} install -r ./requirements.txt
${vpip} install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu126
# ${vpip} freeze > ./requirements.txt