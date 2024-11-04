import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/design';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[50],
  },
  step: {
    flex: 1,
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.neutral[900],
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[500],
    textAlign: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  primaryButton: {
    backgroundColor: COLORS.primary[600],
    paddingVertical: SPACING.md,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    shadowColor: COLORS.primary[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.body1,
    fontWeight: '600',
    color: COLORS.neutral[50],
  },
  disabledButton: {
    backgroundColor: COLORS.neutral[300],
    shadowOpacity: 0,
  },
});
