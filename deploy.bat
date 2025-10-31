@echo off
echo Starting automated deployment process...
echo ========================================

echo 1. Running Jest tests with coverage...
echo ----------------------------------------
call npm run test -- --coverage --watchAll=false

if %errorlevel% neq 0 (
    echo ERROR: Deployment stopped. Please fix failed tests or improve coverage above 80%.
    pause
    exit /b 1
)

echo SUCCESS: All tests passed and coverage >= 80%!
echo.

echo 2. Executing Git commands...
echo ----------------------------------------
echo Adding all changes...
git add .

echo Committing changes...
git commit -m "Auto-deploy: workflow triggered"

echo Pushing to main branch...
git push origin main

if %errorlevel% neq 0 (
    echo ERROR: Failed to push to main branch
    pause
    exit /b 1
)

echo SUCCESS: Successfully pushed to main branch!
echo.

echo 3. GitHub Actions workflow triggered!
echo ----------------------------------------
echo The push to main branch has automatically triggered the GitHub Actions workflow.
echo Building and deploying your Angular app to GitHub Pages...
echo.

echo Deployment process initiated successfully!
echo ==========================================
echo.
echo What happens next:
echo 1. GitHub Actions will build your Angular app
echo 2. Run tests and validate coverage in CI/CD
echo 3. Deploy to GitHub Pages automatically
echo.
echo SUCCESS: Deployment successful! View your site at:
echo https://AishwaryaKulkarni1801.github.io/newPromptTetsing/
echo.
echo Monitor the deployment:
echo https://github.com/AishwaryaKulkarni1801/newPromptTetsing/actions
echo.
echo Your Angular app is being deployed to GitHub Pages!
pause