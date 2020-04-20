import Taro from '@tarojs/taro'
import { View, Image, Switch, Text } from '@tarojs/components'
import { AtBadge,AtButton } from 'taro-ui'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import AtComponent from './component'

import './listItem.scss'

/**
 * 增强AtListItem 可以配合AtList使用
 * extra部分可以嵌入子元素 <ListItem><View/></ListItem>
 * form 与AtInput配合使用，统一居左
 * titleWrap title超长自动换行
 * extraTextWrap extraText超出自动换行
 */
export default class Index extends Taro.Component {
  handleClick = (...args) => {
    if (_isFunction(this.props.onClick) && !this.props.disabled) {
      this.props.onClick(...args)
    }
  }

  handleSwitchClick (e) {
    e.stopPropagation()
  }

  handleSwitchChange = (...args) => {
    if (_isFunction(this.props.onSwitchChange) && !this.props.disabled) {
      this.props.onSwitchChange(...args)
    }
  }

  render () {
    let {
      dot,
      text,
      max,
      form,
      note,
      arrow,
      title,
      titleWrap,
      thumb,
      iconInfo,
      disabled,
      isSwitch,
      extraText,
      extraTextWrap,
      hasBorder,
      extraThumb,
      switchColor,
      switchIsCheck,
    } = this.props

    titleWrap === null && (titleWrap = form)
    extraTextWrap === null && (extraTextWrap = form)

    const rootClass = classNames(
      'at-list__item',
      {
        'at-list__item--thumb': thumb,
        'at-list__item--multiple': note,
        'at-list__item--disabled': disabled,
        'at-list__item--no-border': !hasBorder
      },
      this.props.className
    )
    const iconClass = classNames(
      iconInfo.prefixClass || 'at-icon',
      {
        [`${iconInfo.prefixClass || 'at-icon'}-${iconInfo.value}`]: iconInfo.value,
      },
      iconInfo.className
    )

    const titleClass = classNames(
      'item-content__info-title',
      {
        [`item-content__info-title--wrap`]: titleWrap,
        [`item-content__info-title--form`]: form,
      },
    )

    const extraTextClass = classNames(
      'item-extra__info',
      {
        [`item-extra__info--wrap`]: extraTextWrap,

      },
    )

    const itemContentClass = classNames(
      'at-list__item-content item-content',
      {
        [`at-list__item-content--form`]: form,
      },
    )

    const itemExtraClass = classNames(
      'at-list__item-extra item-extra',
      {
        [`item-extra--form`]: form,
      },
    )

    const hasBadge = dot || text
    const thumbRender = <View>
      {thumb && (
        <View className='at-list__item-thumb item-thumb'>
          {hasBadge
            ? <AtBadge dot={dot} value={text} maxValue={max}>
              <Image
                className='item-thumb__info'
                mode='scaleToFill'
                src={thumb}
              />
            </AtBadge>
            : <Image
              className='item-thumb__info'
              mode='scaleToFill'
              src={thumb}
            />
          }
        </View>
      )}
      {iconInfo.value && (
        <View className='at-list__item-icon item-icon'>
          {hasBadge
            ? <AtBadge dot={dot} value={text} maxValue={max}>
              <Text
                className={iconClass}
                style={
                  this.mergeStyle({
                    color: iconInfo.color || '',
                    fontSize: `${iconInfo.size || 24}px`,
                  }, iconInfo.customStyle)
                }
              />
            </AtBadge>
            : <Text
              className={iconClass}
              style={
                this.mergeStyle({
                  color: iconInfo.color || '',
                  fontSize: `${iconInfo.size || 24}px`,
                }, iconInfo.customStyle)
              }
            />
          }
        </View>
      )}
    </View>
    return (
      <View className={rootClass} onClick={this.handleClick}>
        <View className='at-list__item-container'>
          {thumbRender}
          <View className={itemContentClass}>
            <View className='item-content__info'>
              <View className={titleClass}>{title}</View>
              {note && <View className='item-content__info-note'>{note}</View>}
            </View>
          </View>
          <View className={itemExtraClass}>
            {this.props.children}
            {extraText && <View className={extraTextClass}>{extraText}</View>}

            {extraThumb && !extraText && (
              <View className='item-extra__image'>
                <Image
                  className='item-extra__image-info'
                  mode='aspectFit'
                  src={extraThumb}
                />
              </View>
            )}

            {isSwitch && !extraThumb && !extraText && (
              <View
                className='item-extra__switch'
                onClick={this.handleSwitchClick}
              >
                <Switch
                  color={switchColor}
                  disabled={disabled}
                  checked={switchIsCheck}
                  onChange={this.handleSwitchChange}
                />
              </View>
            )}

            {arrow ? (
              <View className='item-extra__icon'>
                <Text
                  className={`at-icon item-extra__icon-arrow at-icon-chevron-${arrow}`}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    )
  }
}

Index.defaultProps = {
  dot: false,
  text: null,
  max: null,
  form: false, // 是否配合form使用，如果是，需要向左对其，并且title宽度200px
  note: '',
  disabled: false,
  title: '',
  thumb: '',
  isSwitch: false,
  hasBorder: true,
  switchColor: '#6190E8',
  switchIsCheck: false,
  extraText: '',
  extraThumb: '',
  iconInfo: {},
  onSwitchChange: () => {},
  onClick: () => {},
}

Index.propTypes = {
  dot: PropTypes.bool, // 是否显示红点，优先级比 text 高
  text: PropTypes.oneOfType([ // 右上角显示到文本，可以为数字或文字，如果有 dot，优先显示 dot
    PropTypes.string,
    PropTypes.number
  ]),
  max: PropTypes.number, // text 可显示的最大数字，超过则显示最大数字加'+'，如'99+'
  form: PropTypes.bool,
  note: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  titleWrap: PropTypes.bool,
  thumb: PropTypes.string,
  onClick: PropTypes.func,
  isSwitch: PropTypes.bool,
  hasBorder: PropTypes.bool,
  switchColor: PropTypes.string,
  switchIsCheck: PropTypes.bool,
  extraText: PropTypes.string,
  extraTextWrap: PropTypes.bool,
  extraThumb: PropTypes.string,
  onSwitchChange: PropTypes.func,
  arrow: PropTypes.oneOf(['up', 'down', 'right']),
  iconInfo: PropTypes.shape({
    size: PropTypes.number,
    value: PropTypes.string,
    color: PropTypes.string,
    prefixClass: PropTypes.string,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  })
}
