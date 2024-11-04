import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';

export default StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  headerText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[700],
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    overflow: 'hidden',
  },
  settingsContainer: {
    backgroundColor: COLORS.neutral[50],
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.neutral[200],
    padding: SPACING.md,
    gap: SPACING.md,
  },
  settingRow: {
    gap: SPACING.xs,
  },
  settingLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[600],
    marginBottom: SPACING.xs,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary[600],
    fontWeight: '600',
    minWidth: 45,
    textAlign: 'right',
  },
  presetScroll: {
    flexDirection: 'row',
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  presetButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.neutral[200],
    marginRight: SPACING.sm,
  },
  presetButtonSelected: {
    backgroundColor: COLORS.primary[50],
    borderColor: COLORS.primary[400],
  },
  presetText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[600],
  },
  presetTextSelected: {
    color: COLORS.primary[600],
    fontWeight: '600',
  },
  negativePromptInput: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[800],
    borderWidth: 2,
    borderColor: COLORS.neutral[200],
    borderRadius: 8,
    padding: SPACING.sm,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
