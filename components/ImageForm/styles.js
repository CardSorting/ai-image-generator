import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SCREEN_HEIGHT } from '../../constants/design';

export default StyleSheet.create({
  formContent: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    ...TYPOGRAPHY.overline,
    color: COLORS.neutral[700],
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    backgroundColor: COLORS.neutral[50],
    borderWidth: 2,
    borderColor: COLORS.neutral[200],
    borderRadius: 16,
    shadowColor: COLORS.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: COLORS.feedback.error.main,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary[400],
    shadowColor: COLORS.primary[400],
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  promptInput: {
    ...TYPOGRAPHY.body1,
    minHeight: SCREEN_HEIGHT * 0.15,
    padding: SPACING.md,
    color: COLORS.neutral[800],
  },
  inputIcon: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.feedback.error.main,
    flex: 1,
  },
  inputFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  characterCount: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[400],
  },
  characterCountWarning: {
    color: COLORS.feedback.warning.main,
  },
  characterCountLimit: {
    color: COLORS.feedback.error.main,
  },
});
