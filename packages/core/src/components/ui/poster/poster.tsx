import {
  h, Component, Prop, State, Watch, Host, Event, EventEmitter,
} from '@stencil/core';
import { openPlayerWormhole } from '../../core/player/PlayerWormhole';
import { PlayerProp, PlayerProps } from '../../core/player/PlayerProp';
import { isUndefined } from '../../../utils/unit';

@Component({
  tag: 'vime-poster',
  styleUrl: 'poster.scss',
})
export class Poster {
  @State() isHidden = true;

  @State() isActive = false;

  @State() hasLoaded = false;

  /**
   * How the poster image should be resized to fit the container (sets the `object-fit` property).
   */
  @Prop() fit?: 'fill' | 'contain' | 'cover' | 'scale-down' | 'none' = 'cover';

  /**
   * @internal
   */
  @Prop() isVideoView: PlayerProps[PlayerProp.IsVideoView] = false;

  /**
   * @internal
   */
  @Prop() currentPoster?: PlayerProps[PlayerProp.CurrentPoster];

  @Watch('currentPoster')
  onCurrentPosterChange() {
    this.hasLoaded = false;
  }

  /**
   * @internal
   */
  @Prop() mediaTitle?: PlayerProps[PlayerProp.MediaTitle];

  /**
   * @internal
   */
  @Prop() playbackStarted: PlayerProps[PlayerProp.PlaybackStarted] = false;

  /**
   * Emitted when the poster has loaded.
   */
  @Event({ bubbles: false }) vLoaded!: EventEmitter<void>;

  /**
   * Emitted when the poster will be shown.
   */
  @Event({ bubbles: false }) vWillShow!: EventEmitter<void>;

  /**
   * Emitted when the poster will be hidden.
   */
  @Event({ bubbles: false }) vWillHide!: EventEmitter<void>;

  componentWillLoad() {
    this.onEnabledChange();
    this.onActiveChange();
  }

  private onVisibilityChange() {
    (!this.isHidden && this.isActive) ? this.vWillShow.emit() : this.vWillHide.emit();
  }

  @Watch('isVideoView')
  @Watch('currentPoster')
  onEnabledChange() {
    this.isHidden = !this.isVideoView || isUndefined(this.currentPoster);
    this.onVisibilityChange();
  }

  @Watch('playbackStarted')
  onActiveChange() {
    this.isActive = !this.playbackStarted;
    this.onVisibilityChange();
  }

  private onPosterLoad() {
    this.vLoaded.emit();
    this.hasLoaded = true;
  }

  render() {
    return (
      <Host
        class={{
          hidden: this.isHidden,
          active: this.isActive && this.hasLoaded,
        }}
      >
        <img
          class="lazy"
          data-src={this.currentPoster}
          alt={!isUndefined(this.mediaTitle) ? `${this.mediaTitle} Poster` : 'Media Poster'}
          style={{ objectFit: this.fit }}
          onLoad={this.onPosterLoad.bind(this)}
        />
      </Host>
    );
  }
}

openPlayerWormhole(Poster, [
  PlayerProp.MediaTitle,
  PlayerProp.CurrentPoster,
  PlayerProp.PlaybackStarted,
  PlayerProp.IsVideoView,
]);
