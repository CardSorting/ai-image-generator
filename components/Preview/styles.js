import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';

export default StyleSheet.create({
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.neutral[800],
  },
  backButton: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  backButtonText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary[600],
    fontWeight: '600',
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: COLORS.neutral[100],
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.neutral[900] + '80',
    padding: SPACING.xs,
    borderRadius: 8,
  },
  details: {
    backgroundColor: COLORS.neutral[50],
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.lg,
    shadowColor: COLORS.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    gap: SPACING.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  sectionLabel: {
    ...TYPOGRAPHY.overline,
    color: COLORS.neutral[500],
  },
  prompt: {
    ...TYPOGRAPHY.body1,
    color: COLORS.neutral[800],
  },
  specs: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  specItem: {
    flex: 1,
    gap: SPACING.xs,
  },
  specLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
  },
  specValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[700],
    fontWeight: '500',
  },
});
