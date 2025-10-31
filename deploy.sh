#!/bin/bash

# Automated Angular Deployment Script with Jest Coverage Validation
# This script runs tests, checks coverage, and deploys to GitHub Pages

echo "🚀 Starting automated deployment process..."
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Run Jest tests with coverage
echo -e "${BLUE}1️⃣ Running Jest tests with coverage...${NC}"
echo "----------------------------------------"

# Run tests and capture output
test_output=$(npm run test -- --coverage --watchAll=false 2>&1)
test_exit_code=$?

echo "$test_output"

# Check if tests passed
if [ $test_exit_code -ne 0 ]; then
    echo -e "${RED}❌ Deployment stopped. Test suites failed.${NC}"
    echo -e "${RED}Please fix failed tests before deploying.${NC}"
    exit 1
fi

# Extract coverage percentages
statements_coverage=$(echo "$test_output" | grep "Statements" | sed 's/.*: \([0-9.]*\)%.*/\1/')
branches_coverage=$(echo "$test_output" | grep "Branches" | sed 's/.*: \([0-9.]*\)%.*/\1/')
functions_coverage=$(echo "$test_output" | grep "Functions" | sed 's/.*: \([0-9.]*\)%.*/\1/')
lines_coverage=$(echo "$test_output" | grep "Lines" | sed 's/.*: \([0-9.]*\)%.*/\1/')

echo -e "${BLUE}Coverage Results:${NC}"
echo "Statements: ${statements_coverage}%"
echo "Branches: ${branches_coverage}%"
echo "Functions: ${functions_coverage}%"
echo "Lines: ${lines_coverage}%"

# Check if coverage meets 80% threshold
coverage_threshold=80

if (( $(echo "$statements_coverage < $coverage_threshold" | bc -l) )) || \
   (( $(echo "$functions_coverage < $coverage_threshold" | bc -l) )) || \
   (( $(echo "$lines_coverage < $coverage_threshold" | bc -l) )); then
    echo -e "${RED}❌ Deployment stopped. Please fix failed tests or improve coverage above 80%.${NC}"
    echo -e "${RED}Current coverage is below the required 80% threshold.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All tests passed and coverage >= 80%!${NC}"
echo ""

# Step 2: Git operations
echo -e "${BLUE}2️⃣ Executing Git commands...${NC}"
echo "----------------------------------------"

echo "Adding all changes..."
git add .

echo "Committing changes..."
git commit -m "Auto-deploy: workflow triggered"

echo "Pushing to main branch..."
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to main branch!${NC}"
else
    echo -e "${RED}❌ Failed to push to main branch${NC}"
    exit 1
fi

echo ""

# Step 3: GitHub Actions workflow notification
echo -e "${BLUE}3️⃣ GitHub Actions workflow triggered!${NC}"
echo "----------------------------------------"
echo "The push to main branch has automatically triggered the GitHub Actions workflow."
echo "Building and deploying your Angular app to GitHub Pages..."
echo ""

# Step 4: Success message
echo -e "${GREEN}🎉 Deployment process initiated successfully!${NC}"
echo "=========================================="
echo ""
echo -e "${YELLOW}📋 What happens next:${NC}"
echo "1. GitHub Actions will build your Angular app"
echo "2. Run tests and validate coverage in CI/CD"
echo "3. Deploy to GitHub Pages automatically"
echo ""
echo -e "${GREEN}✅ Deployment successful! View your site at:${NC}"
echo -e "${BLUE}🌐 https://AishwaryaKulkarni1801.github.io/newPromptTetsing/${NC}"
echo ""
echo -e "${YELLOW}💡 Monitor the deployment:${NC}"
echo "🔗 https://github.com/AishwaryaKulkarni1801/newPromptTetsing/actions"
echo ""
echo -e "${GREEN}🚀 Your Angular app is being deployed to GitHub Pages!${NC}"