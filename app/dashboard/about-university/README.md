# About University Editor

## Overview
The About University Editor component allows administrators to manage all content displayed on the "About University" page. This component provides a user-friendly interface for updating text, images, statistics, achievements, rules, guidelines, and other content related to the university's about page.

## Features
- **Complete Content Management**: Edit all sections of the About University page
- **Multi-tab Interface**: Organized tabs for each section (Hero, Intro, Statistics, etc.)
- **Drag-and-Drop Reordering**: Easily reorder items like statistics, achievements, etc.
- **Image Uploads**: Upload and preview background images
- **Arabic RTL Support**: Fully supports right-to-left layout for Arabic content
- **Instant Preview**: See how changes will look before saving

## Component Structure
The editor is organized into the following tabs:

1. **Hero Section**: Edit the main header, subtitle, and background image
2. **Introduction**: Update the introduction text sections
3. **Statistics**: Add, remove, and reorder university statistics
4. **Achievements**: Manage university achievements with custom icons
5. **Rules**: Edit university rules and policies
6. **Guidelines**: Manage student guidelines with icons
7. **Navigation**: Control the navigation menu items
8. **Features**: Add or remove university features

## Data Structure
The component uses the following data structure:

```typescript
interface AboutUniversityData {
  hero: HeroSection;
  intro: IntroSection;
  statistics: Statistic[];
  achievementSection: SectionData;
  achievements: Achievement[];
  rulesSection: SectionData;
  rules: Rule[];
  guidelinesSection: SectionData;
  guidelines: Guideline[];
  navbar: NavItem[];
  features: Feature[];
}
```

## API Endpoints
The component interacts with the following API endpoints:

- `GET /api/dashboard/about-university` - Retrieves all about university data
- `PUT /api/dashboard/about-university` - Updates about university data

## Authentication
Only administrators and editors can access this component. Authentication is handled through the Next.js middleware and API route protection.

## Database Tables
The component uses the following database tables:
- `about_hero_section`
- `about_intro_section`
- `about_statistics`
- `about_achievements_section`
- `about_achievements`
- `about_rules_section`
- `about_rules`
- `about_guidelines_section`
- `about_guidelines`
- `about_navbar`
- `about_features` 