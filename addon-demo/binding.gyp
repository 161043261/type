{
    "targets": [
        {
            "target_name": "kcp",
            "include_dirs": ["<!(node -e \"require('nan')\")"],
            "sources": ["addon/ikcp.c", "addon/kcpobject.cc", "addon/node-kcp.cc"],
        }
    ]
} # type: ignore
