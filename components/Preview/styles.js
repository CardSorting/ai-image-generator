import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/design';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_MAX_WIDTH = Math.min(SCREEN_WIDTH - SPACING.xl * 2, 400);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral[900],
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral[900],
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    height: Platform.OS === 'ios' ? 44 : 56,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.neutral[900],
    opacity: 0,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xs,
    marginLeft: -SPACING.xs,
    borderRadius: 8,
  },
  backButtonText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[50],
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.neutral[50],
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    opacity: 0,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageSection: {
    alignItems: 'center',
    paddingTop: SPACING.xl * 2,
    paddingBottom: SPACING.xl * 3,
    marginBottom: -SPACING.xl * 2,
  },
  imageContainer: {
    width: IMAGE_MAX_WIDTH,
    aspectRatio: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.neutral[800],
    borderWidth: 1,
    borderColor: COLORS.neutral[700],
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral[900],
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
  },
  overlayText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[50],
    fontWeight: '600',
  },
  detailsSection: {
    backgroundColor: COLORS.neutral[50],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: SPACING.xl * 2,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral[900],
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  infoContainer: {
    backgroundColor: COLORS.neutral[50],
    borderRadius: 20,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.neutral[200],
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  section: {
    padding: SPACING.lg,
    backgroundColor: COLORS.neutral[50],
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.neutral[100],
    marginHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  sectionLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  prompt: {
    ...TYPOGRAPHY.body1,
    color: COLORS.neutral[800],
    lineHeight: 24,
    fontSize: 16,
  },
  specs: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  specItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.neutral[100],
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.neutral[200],
  },
  specContent: {
    flex: 1,
  },
  specLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
    fontWeight: '500',
    marginBottom: 2,
  },
  specValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[700],
    fontWeight: '600',
  },
  footer: {
    padding: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.lg,
    backgroundColor: COLORS.neutral[50],
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral[100],
  },
  galleryButton: {
    backgroundColor: COLORS.primary[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    height: 56,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary[900],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  galleryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.neutral[50],
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
