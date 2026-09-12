FROM node:20-slim

# Install system dependencies including Python 3, pip, and tesseract-ocr
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    tesseract-ocr \
    tesseract-ocr-eng \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Hugging Face Spaces runs as user with UID 1000
RUN useradd -m -u 1000 user

WORKDIR /app

# Install Python dependencies: CPU-only torch first to save download time and disk space
COPY requirements.txt ./
RUN pip3 install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu --break-system-packages \
    && pip3 install --no-cache-dir -r requirements.txt --break-system-packages

# Install Node dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy application code
COPY . .

# Ensure upload, jobdesc, and output directories exist with proper permissions
RUN mkdir -p uploads jobdesc output \
    && chown -R user:user /app

# Switch to non-root user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PORT=7860 \
    PYTHON_BIN=python3 \
    NODE_ENV=production

EXPOSE 7860

CMD ["node", "server.js"]
