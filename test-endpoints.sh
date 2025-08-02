#!/bin/bash

echo "Testing API Endpoints..."

# Test basic connectivity
echo "1. Testing backend connectivity..."
curl -m 5 -s "http://localhost:8000/new/problems/problems" > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Backend is responding"
else
    echo "❌ Backend not responding"
fi

# Test evaluation endpoint
echo "2. Testing evaluation endpoint..."
RESPONSE=$(curl -m 10 -s -X POST "http://localhost:8000/new/evaluation/run/094638fa-c004-4a95-91a8-e5d5123a160a" \
    -H "Content-Type: application/json" \
    -d '{"code":"#include<iostream>\nusing namespace std;\nint main(){cout<<\"Hello\";return 0;}","language":"cpp"}')

echo "Response: $RESPONSE"

# Test if response contains expected fields
if echo "$RESPONSE" | grep -q "success"; then
    echo "✅ Evaluation endpoint is responding"
else
    echo "❌ Evaluation endpoint not working properly"
fi
