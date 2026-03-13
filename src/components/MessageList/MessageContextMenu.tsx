import { memo } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import type { Message, MessengerTheme } from '../../types';
import { CopyIcon } from '../../assets/icons/CopyIcon';
import { DeleteIcon } from '../../assets/icons/DeleteIcon';
import { EditIcon } from '../../assets/icons/EditIcon';
import { ForwardIcon } from '../../assets/icons/ForwardIcon';
import { ReportIcon } from '../../assets/icons/ReportIcon';
import { ReplyIcon } from '../../assets/icons/ReplyIcon';

const MENU_ICON_SIZE = 20;

function MenuItemIcon({
  id,
  color,
}: {
  id: MessageContextMenuAction['id'];
  color: string;
}) {
  const iconProps = { color, width: MENU_ICON_SIZE, height: MENU_ICON_SIZE };
  switch (id) {
    case 'edit':
      return <EditIcon {...iconProps} width={16} height={16} />;
    case 'reply':
      return <ReplyIcon {...iconProps} />;
    case 'forward':
      return <ForwardIcon {...iconProps} />;
    case 'copy':
      return <CopyIcon {...iconProps} />;
    case 'report':
      return <ReportIcon {...iconProps} />;
    case 'delete':
      return <DeleteIcon {...iconProps} />;
    default:
      return null;
  }
}

export interface MessageContextMenuAction {
  id: 'edit' | 'reply' | 'forward' | 'copy' | 'report' | 'delete';
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

interface MessageContextMenuProps {
  visible: boolean;
  message: Message | null;
  position: { x: number; y: number; width: number; height: number };
  /** When true (sent message), menu is aligned to the right edge of the bubble */
  isCurrentUser?: boolean;
  theme?: Partial<MessengerTheme>;
  onClose: () => void;
  onEdit?: (message: Message) => void;
  onReplyPress?: (messageId: string) => void;
  onForward?: (message: Message) => void;
  onCopy?: (message: Message) => void;
  onReport?: (message: Message) => void;
  onDelete?: (message: Message) => void;
}

const MENU_ITEM_HEIGHT = 44;
const MENU_WIDTH = 220;
const MENU_PADDING = 8;
const GAP_BELOW_BUBBLE = 6;
const SCREEN_PADDING = 12;

export const MessageContextMenu = memo<MessageContextMenuProps>(
  ({
    visible,
    message,
    position,
    isCurrentUser,
    theme,
    onClose,
    onEdit,
    onReplyPress,
    onForward,
    onCopy,
    onReport,
    onDelete,
  }) => {
    const bg = theme?.colors?.secondary ?? '#2a2e42';
    const textColor = theme?.colors?.text ?? '#f2f4ff';
    const destructiveColor = theme?.colors?.destructive ?? '#ff4d4f';

    if (!visible || !message) return null;

    const items: MessageContextMenuAction[] = [];
    if (onEdit) {
      items.push({
        id: 'edit',
        label: 'Edit',
        onPress: () => {
          onClose();
          onEdit(message);
        },
      });
    }
    if (onReplyPress) {
      items.push({
        id: 'reply',
        label: 'Reply',
        onPress: () => {
          onClose();
          onReplyPress(message.id);
        },
      });
    }
    if (onForward) {
      items.push({
        id: 'forward',
        label: 'Forward',
        onPress: () => {
          onClose();
          onForward(message);
        },
      });
    }
    if (onCopy) {
      items.push({
        id: 'copy',
        label: 'Copy',
        onPress: () => {
          onClose();
          onCopy(message);
        },
      });
    }
    if (onReport) {
      items.push({
        id: 'report',
        label: 'Report',
        onPress: () => {
          onClose();
          onReport(message);
        },
      });
    }
    if (onDelete) {
      items.push({
        id: 'delete',
        label: 'Delete',
        onPress: () => {
          onClose();
          onDelete(message);
        },
        destructive: true,
      });
    }

    if (items.length === 0) return null;

    const { width: screenWidth, height: screenHeight } =
      Dimensions.get('window');
    const menuHeight =
      items.length * MENU_ITEM_HEIGHT + MENU_PADDING * 2;

    const alignRight = isCurrentUser === true;
    let menuLeft = alignRight
      ? position.x + position.width - MENU_WIDTH
      : position.x;
    menuLeft = Math.max(
      SCREEN_PADDING,
      Math.min(menuLeft, screenWidth - MENU_WIDTH - SCREEN_PADDING)
    );

    let menuTop = position.y + position.height + GAP_BELOW_BUBBLE;
    if (menuTop + menuHeight > screenHeight - SCREEN_PADDING) {
      menuTop = position.y - menuHeight - GAP_BELOW_BUBBLE;
    }
    menuTop = Math.max(
      SCREEN_PADDING,
      Math.min(menuTop, screenHeight - menuHeight - SCREEN_PADDING)
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.menu,
              {
                backgroundColor: bg,
                left: menuLeft,
                top: menuTop,
                width: MENU_WIDTH,
              },
            ]}
            onPress={() => {}}
          >
            {items.map((item) => {
              const itemColor = item.destructive
                ? destructiveColor
                : textColor;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[styles.menuLabel, { color: itemColor }]}
                  >
                    {item.label}
                  </Text>
                  <MenuItemIcon id={item.id} color={itemColor} />
                </TouchableOpacity>
              );
            })}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menu: {
    position: 'absolute',
    borderRadius: 12,
    paddingVertical: MENU_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: MENU_ITEM_HEIGHT,
    paddingHorizontal: 16,
  },
  menuLabel: {
    fontSize: 16,
  },
});
