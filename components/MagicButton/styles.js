import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';

export default StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    zIndex: 1,
    marginVertical: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: COLORS.primary[600],
    borderRadius: 30,
    shadowColor: COLORS.primary[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ translateZ: 0 }],
    borderWidth: 2,
    borderColor: COLORS.primary[400],
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral[300],
    borderColor: COLORS.neutral[400],
    shadowOpacity: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    minHeight: 60,
  },
  buttonText: {
    ...TYPOGRAPHY.body1,
    fontWeight: '800',
    color: COLORS.neutral[50],
    letterSpacing: 0.8,
    fontSize: 20,
  },
  sparklesContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 0,
  },
  sparkle: {
    position: 'absolute',
    width: 24,
    height: 24,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
