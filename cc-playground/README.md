# build

Simply create a CMake app

> [!IMPORTANT]
> Recommended: build-essential, clang, clang-format, clangd, cmake, gdb, lld, llvm, ninja-build

```bash
sudo apt install build-essential clang clang-format clangd cmake gdb lld llvm ninja-build -y
chmod 755 ./build.sh
```

Create a cmake app

```bash
./build.sh
```

Create a cmake app named "playground"

```bash
./build.sh cc-playground
```
