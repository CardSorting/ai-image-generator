import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[50],
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  content: {
    alignItems: 'center',
    gap: SPACING.xl * 1.5,
  },
  wandContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  wandWrapper: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary[50],
    borderRadius: 40,
    shadowColor: COLORS.primary[400],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: COLORS.primary[200],
  },
  loadingText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.primary[700],
    textAlign: 'center',
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary[500],
    borderRadius: 3,
    shadowColor: COLORS.primary[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary[600],
    fontWeight: '600',
  },
});
