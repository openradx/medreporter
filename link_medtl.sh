#!/usr/bin/env bash

PROJECT_DIR="$(dirname $(readlink -f $0))"
WORKSPACE_DIR="$(dirname $PROJECT_DIR)"
MEDTL_DIR="$WORKSPACE_DIR/medtl/packages"

pnpm link "$MEDTL_DIR/medtl-language-service"
pnpm link "$MEDTL_DIR/medtl-parser"
pnpm link "$MEDTL_DIR/medtl-schema"
pnpm link "$MEDTL_DIR/medtl-tools"
pnpm link "$MEDTL_DIR/monaco-plugin-medtl"
