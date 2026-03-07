#!/bin/bash
# Zipangu Linux Launch Script

# Set classpath (using colon as delimiter for Linux)
export CLASSPATH=".:dist/*"

# Launch the server with 2GB RAM
java -Xmx2g -Dnet.sf.odinms.wzpath=wz server.Start
