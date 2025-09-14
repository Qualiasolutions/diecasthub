import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/')
    
    // Check page title
    await expect(page).toHaveTitle(/Diecast Hub/)
    
    // Check hero section elements
    await expect(page.locator('text=Premium Diecast Models')).toBeVisible()
    await expect(page.locator('text=for Collectors')).toBeVisible()
    await expect(page.locator('text=Shop Collection')).toBeVisible()
    await expect(page.locator('text=Learn More')).toBeVisible()
  })

  test('should display header navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check header elements
    await expect(page.locator('text=Diecast Hub')).toBeVisible()
    await expect(page.locator('text=Home')).toBeVisible()
    await expect(page.locator('text=Products')).toBeVisible()
    await expect(page.locator('text=Brands')).toBeVisible()
    await expect(page.locator('text=Categories')).toBeVisible()
    await expect(page.locator('text=About')).toBeVisible()
    await expect(page.locator('text=Contact')).toBeVisible()
  })

  test('should display featured products section', async ({ page }) => {
    await page.goto('/')
    
    // Check featured products section
    await expect(page.locator('text=Featured Collection')).toBeVisible()
    await expect(page.locator('text=Premium Models')).toBeVisible()
    await expect(page.locator('text=View All Products')).toBeVisible()
  })

  test('should display categories showcase', async ({ page }) => {
    await page.goto('/')
    
    // Check categories section
    await expect(page.locator('text=Explore by Category')).toBeVisible()
    await expect(page.locator('text=Sports Cars')).toBeVisible()
    await expect(page.locator('text=Classic Cars')).toBeVisible()
    await expect(page.locator('text=Browse All Categories')).toBeVisible()
  })

  test('should display footer', async ({ page }) => {
    await page.goto('/')
    
    // Check footer elements
    await expect(page.locator('text=Your premier destination')).toBeVisible()
    await expect(page.locator('text=Stay Updated')).toBeVisible()
    await expect(page.locator('text=© 2024 Diecast Hub')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check mobile menu trigger is visible
    const menuButton = page.locator('[role="button"]:has-text("Toggle menu")')
    await expect(menuButton).toBeVisible()
    
    // Check hero section is still visible
    await expect(page.locator('text=Premium Diecast Models')).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/')
    
    // Test Shop Collection button
    const shopButton = page.locator('text=Shop Collection').first()
    await expect(shopButton).toHaveAttribute('href', '/products')
    
    // Test Learn More button
    const learnButton = page.locator('text=Learn More').first()
    await expect(learnButton).toHaveAttribute('href', '/about')
    
    // Test View All Products button
    const viewAllButton = page.locator('text=View All Products')
    await expect(viewAllButton).toHaveAttribute('href', '/products')
  })

  test('should handle search functionality', async ({ page }) => {
    await page.goto('/')
    
    // Check search input is present
    const searchInput = page.locator('input[placeholder*="Search diecast models"]')
    await expect(searchInput).toBeVisible()
    
    // Test typing in search
    await searchInput.fill('Ferrari')
    await expect(searchInput).toHaveValue('Ferrari')
  })
})