import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';

export default StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.overline,
    color: COLORS.neutral[700],
    marginBottom: SPACING.md,
  },
  selector: {
    gap: SPACING.sm,
  },
  option: {
    backgroundColor: COLORS.neutral[50],
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.neutral[200],
    padding: SPACING.md,
    shadowColor: COLORS.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedOption: {
    backgroundColor: COLORS.primary[50],
    borderColor: COLORS.primary[400],
  },
  content: {
    gap: SPACING.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.body2,
    fontWeight: '600',
    color: COLORS.neutral[700],
  },
  selectedLabel: {
    color: COLORS.primary[700],
  },
  description: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
  },
  selectedDescription: {
    color: COLORS.primary[600],
  },
  dimensions: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[400],
  },
  selectedDimensions: {
    color: COLORS.primary[500],
  },
  selectedIndicator: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
  },
});
