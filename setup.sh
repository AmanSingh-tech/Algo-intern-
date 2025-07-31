#!/bin/bash

echo "🚀 Setting up CodeArena Development Environment..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Check if .env files exist
echo "🔍 Checking environment files..."

if [ ! -f "server/.env" ]; then
    echo "⚠️  server/.env not found. Creating template..."
    cat > server/.env << EOL
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/codearena"

# JWT Configuration
JWT_PASSKEY="your_jwt_secret_key_here"
SALT_ROUNDS=10

# Server Configuration
PORT=8000
EOL
    echo "✅ Created server/.env template. Please update with your values."
fi

if [ ! -f "client/.env.local" ]; then
    echo "⚠️  client/.env.local not found. Creating..."
    cat > client/.env.local << EOL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
EOL
    echo "✅ Created client/.env.local"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your database URL and JWT secret"
echo "2. Run 'npm run dev' to start both frontend and backend"
echo "3. Frontend: http://localhost:3000"
echo "4. Backend: http://localhost:8000"
echo ""
