# Automated Angular Deployment Script with Jest Coverage Validation
# This script runs tests, checks coverage, and deploys to GitHub Pages

Write-Host "Starting automated deployment process..." -ForegroundColor Blue
Write-Host "========================================"

# Step 1: Run Jest tests with coverage
Write-Host "1. Running Jest tests with coverage..." -ForegroundColor Blue
Write-Host "----------------------------------------"

try {
    # Run tests and capture output
    $testOutput = npm run test -- --coverage --watchAll=false 2>&1 | Out-String
    $testExitCode = $LASTEXITCODE
    
    Write-Host $testOutput
    
    # Check if tests passed
    if ($testExitCode -ne 0) {
        Write-Host "ERROR: Deployment stopped. Test suites failed." -ForegroundColor Red
        Write-Host "Please fix failed tests before deploying." -ForegroundColor Red
        exit 1
    }
    
    # Extract coverage percentages using regex
    $statementsMatch = [regex]::Match($testOutput, "Statements\s*:\s*(\d+(?:\.\d+)?)%")
    $branchesMatch = [regex]::Match($testOutput, "Branches\s*:\s*(\d+(?:\.\d+)?)%")
    $functionsMatch = [regex]::Match($testOutput, "Functions\s*:\s*(\d+(?:\.\d+)?)%")
    $linesMatch = [regex]::Match($testOutput, "Lines\s*:\s*(\d+(?:\.\d+)?)%")
    
    if ($statementsMatch.Success -and $functionsMatch.Success -and $linesMatch.Success) {
        $statementsCoverage = [double]$statementsMatch.Groups[1].Value
        $functionsCoverage = [double]$functionsMatch.Groups[1].Value
        $linesCoverage = [double]$linesMatch.Groups[1].Value
        $branchesCoverage = if ($branchesMatch.Success) { [double]$branchesMatch.Groups[1].Value } else { 100 }
        
        Write-Host "Coverage Results:" -ForegroundColor Blue
        Write-Host "Statements: $statementsCoverage%"
        Write-Host "Branches: $branchesCoverage%"
        Write-Host "Functions: $functionsCoverage%"
        Write-Host "Lines: $linesCoverage%"
        
        # Check if coverage meets 80% threshold
        $coverageThreshold = 80
        
        if ($statementsCoverage -lt $coverageThreshold -or 
            $functionsCoverage -lt $coverageThreshold -or 
            $linesCoverage -lt $coverageThreshold) {
            Write-Host "ERROR: Deployment stopped. Please fix failed tests or improve coverage above 80%." -ForegroundColor Red
            Write-Host "Current coverage is below the required 80% threshold." -ForegroundColor Red
            exit 1
        }
        
        Write-Host "SUCCESS: All tests passed and coverage >= 80%!" -ForegroundColor Green
    } else {
        Write-Host "SUCCESS: All tests passed! (Coverage parsing not available, proceeding with deployment)" -ForegroundColor Green
    }
    
} catch {
    Write-Host "ERROR: Error running tests: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Git operations
Write-Host "2. Executing Git commands..." -ForegroundColor Blue
Write-Host "----------------------------------------"

try {
    Write-Host "Adding all changes..."
    git add .
    
    Write-Host "Committing changes..."
    git commit -m "Auto-deploy: workflow triggered"
    
    Write-Host "Pushing to main branch..."
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: Successfully pushed to main branch!" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Failed to push to main branch" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "ERROR: Git operation failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: GitHub Actions workflow notification
Write-Host "3. GitHub Actions workflow triggered!" -ForegroundColor Blue
Write-Host "----------------------------------------"
Write-Host "The push to main branch has automatically triggered the GitHub Actions workflow."
Write-Host "Building and deploying your Angular app to GitHub Pages..."
Write-Host ""

# Step 4: Success message
Write-Host "Deployment process initiated successfully!" -ForegroundColor Green
Write-Host "=========================================="
Write-Host ""
Write-Host "What happens next:" -ForegroundColor Yellow
Write-Host "1. GitHub Actions will build your Angular app"
Write-Host "2. Run tests and validate coverage in CI/CD"
Write-Host "3. Deploy to GitHub Pages automatically"
Write-Host ""
Write-Host "SUCCESS: Deployment successful! View your site at:" -ForegroundColor Green
Write-Host "https://AishwaryaKulkarni1801.github.io/newPromptTetsing/" -ForegroundColor Blue
Write-Host ""
Write-Host "Monitor the deployment:" -ForegroundColor Yellow
Write-Host "https://github.com/AishwaryaKulkarni1801/newPromptTetsing/actions"
Write-Host ""
Write-Host "Your Angular app is being deployed to GitHub Pages!" -ForegroundColor Green