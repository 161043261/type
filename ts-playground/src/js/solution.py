import subprocess
import re
import platform
import sys
from datetime import datetime
import argparse


def checkOs():
    if platform.system().lower() == "windows":
        raise RuntimeError("Why use Windows?")


def pingIp(ipAddr: str, cnt: int):
    command = ["ping", "-c", str(cnt), ipAddr]
    try:
        return subprocess.check_output(
            command, stderr=subprocess.STDOUT, universal_newlines=True
        )
    except subprocess.CalledProcessError as e:
        return e.output


def parseRtt(output: str):
    pattern = r"time=(\d+\.?\d*) ms"
    return [float(rtt) for rtt in re.findall(pattern, output)]


def writeLog(logPath: str, ip: str, status: str, rtt=None):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(logPath, "a") as f:
        if status == "success":
            f.write(f"timestamp={timestamp} IP={ip} rtt={rtt}ms\n")
        else:
            f.write(f"timestamp=[{timestamp} IP={ip} rtt=error\n")


def main():
    try:
        checkOs()
    except RuntimeError as e:
        print(e)
        sys.exit(1)

    parser = argparse.ArgumentParser(description="ping logger")
    parser.add_argument("ip", help="IP")
    parser.add_argument("-c", "--cnt", type=int, default=4, help="ping cnt")
    parser.add_argument("-l", "--log", default="ping.log", help="path/to/.log")
    args = parser.parse_args()
    output = pingIp(args.ip, args.cnt)
    rttValues = parseRtt(output)

    for i in range(args.cnt):
        try:
            writeLog(args.log, args.ip, "success", rttValues[i])
        except IndexError:
            writeLog(args.log, args.ip, "timeout")

    print(f"output: {args.log}")


if __name__ == "__main__":
    # sample: python ./solution.py 47.92.1.1 -c 100
    main()
