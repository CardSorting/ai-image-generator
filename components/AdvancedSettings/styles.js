import { StyleSheet, Platform } from 'react-native';
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
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.neutral[100],
    borderRadius: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[700],
    fontWeight: '600',
  },
  activeSettingsPill: {
    backgroundColor: COLORS.primary[100],
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    marginLeft: SPACING.sm,
  },
  activeSettingsText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary[700],
  },
  expandedContent: {
    maxHeight: 400,
    marginTop: SPACING.sm,
    position: 'relative',
  },
  scrollView: {
    borderRadius: 12,
    backgroundColor: COLORS.neutral[50],
    borderWidth: 2,
    borderColor: COLORS.neutral[200],
  },
  settingsContainer: {
    padding: SPACING.md,
    gap: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  settingRow: {
    gap: SPACING.md,
  },
  settingLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[600],
    fontWeight: '600',
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xs,
  },
  presetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.neutral[200],
    backgroundColor: COLORS.neutral[50],
    width: '48%',
    marginBottom: SPACING.sm,
  },
  presetButtonSelected: {
    backgroundColor: COLORS.primary[50],
    borderColor: COLORS.primary[400],
  },
  presetText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[600],
    flex: 1,
  },
  presetTextSelected: {
    color: COLORS.primary[600],
    fontWeight: '600',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.neutral[100],
    borderRadius: 12,
    padding: SPACING.sm,
  },
  stepButton: {
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.neutral[300],
  },
  stepIndicatorActive: {
    backgroundColor: COLORS.primary[500],
    transform: [{ scale: 1.2 }],
  },
  stepLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
    fontSize: 12,
    textAlign: 'center',
  },
  stepLabelActive: {
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
  fadeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  fadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: COLORS.neutral[50],
    opacity: 0.9,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primary[50],
    borderRadius: 20,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.primary[100],
    zIndex: 1,
  },
  showMoreText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary[600],
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
});
