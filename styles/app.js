import { StyleSheet, Platform, Dimensions } from 'react-native';

// Design system constants
const COLORS = {
  primary: '#2563EB', // Modern blue
  primaryDark: '#1E40AF',
  secondary: '#3B82F6',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
};

const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Web-specific styles
export const webStyles = {
  select: {
    width: '100%',
    padding: `${SPACING.md}px`,
    borderRadius: BORDER_RADIUS.sm,
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.background,
    fontSize: TYPOGRAPHY.body.fontSize,
    color: COLORS.text,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      borderColor: COLORS.primary,
    },
    '&:focus': {
      outline: 'none',
      borderColor: COLORS.primary,
      boxShadow: `0 0 0 2px ${COLORS.primary}20`,
    },
  },
  button: {
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
};

// Platform-specific shadow styles
const getShadowStyle = (level) => {
  if (Platform.OS === 'web') {
    const shadows = {
      small: '0 2px 4px rgba(0,0,0,0.1)',
      medium: '0 4px 8px rgba(0,0,0,0.15)',
    };
    return { boxShadow: shadows[level] };
  }
  
  const shadows = {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  };
  return shadows[level];
};

// Main styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  promptInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    minHeight: 100,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    ...TYPOGRAPHY.body,
    textAlignVertical: 'top',
    ...getShadowStyle('small'),
  },
  advancedButton: {
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  advancedButtonText: {
    color: COLORS.primary,
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  advancedSettings: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...getShadowStyle('small'),
  },
  settingItem: {
    marginBottom: SPACING.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    color: COLORS.text,
    ...TYPOGRAPHY.body,
  },
  latestImage: {
    marginBottom: SPACING.xl,
  },
  subtitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  mainImage: {
    width: '100%',
    height: 480,
    borderRadius: BORDER_RADIUS.lg,
    ...getShadowStyle('medium'),
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.sm,
    width: '100%',
    ...getShadowStyle('small'),
    ...(Platform.OS === 'web' ? webStyles.button : {}),
  },
  generateButtonDisabled: {
    opacity: 0.7,
    backgroundColor: COLORS.textSecondary,
  },
  generateButtonText: {
    color: COLORS.background,
    textAlign: 'center',
    fontWeight: '600',
    ...TYPOGRAPHY.body,
  },
  historyContainer: {
    marginTop: SPACING.xxl,
  },
  historyTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  historyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  historyItem: {
    flex: 1,
    minWidth: 280,
    maxWidth: Platform.OS === 'web' ? 'calc(33.333% - 16px)' : undefined,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...getShadowStyle('small'),
  },
  historyImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  historyItemContent: {
    padding: SPACING.md,
  },
  historyItemPrompt: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.sm,
  },
  deleteButtonText: {
    color: COLORS.background,
    textAlign: 'center',
    fontWeight: '600',
    ...TYPOGRAPHY.caption,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${COLORS.background}80`,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingIndicator: {
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    ...getShadowStyle('medium'),
  },
  // Responsive adjustments
  '@media (max-width: 768px)': {
    content: {
      padding: SPACING.md,
    },
    historyItem: {
      maxWidth: '100%',
    },
    mainImage: {
      height: 320,
    },
  },
});
