import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
    gap: SPACING.xl,
  },
  iconContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  text: {
    ...TYPOGRAPHY.body1,
    color: COLORS.neutral[700],
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.neutral[200],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary[500],
    transform: [{ scaleX: 0 }],
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
  },
});
