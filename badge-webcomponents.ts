import { Component, Host, h, Prop } from '@stencil/core';
@Component({
  tag: 'aui-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class Badge {
  // public props
 @Prop({mutable: true, reflect: true}) public badgeContent: number;
 @Prop({mutable: true, reflect: true}) public badgeContentString: string;
 @Prop({mutable: true, reflect: true}) public badgeAccessibilityString: string;
 @Prop({mutable: true, reflect: true}) public iconName: string;
 @Prop({mutable: true, reflect: true}) public inverse: boolean = false;
  
  
  render() {
    if (this.badgeContent > 99) {
      this.badgeContentString = "99+";
      this.badgeAccessibilityString = "You have more than 99 notifications";
    } else if (isNaN(this.badgeContent)) {   // if we cannot find a number value in badgeContent, it should still show as empty. This can happen in Data Portal
      this.badgeContentString = "";
      this.badgeAccessibilityString = "You have notifications";
    }
    else {
      this.badgeContentString = this.badgeContent.toString();
      this.badgeAccessibilityString = "You have " + `${this.badgeContentString}` + " notifications";
    }
    const inverseClass = this.inverse ? 'inverse' : '';
    return (
      <Host>
      <div class="Badge-container">
         <div class={`Badge ${inverseClass}`}><div class="Badge-content" badge-content={this.badgeContent} ><slot>{this.badgeContentString}</slot></div>
          <aui-button variant="tertiary" aria-label={`${this.badgeAccessibilityString}`} >
            <aui-icon name={this.iconName} size="large" ></aui-icon>
          </aui-button>
         </div>
      </div>
      </Host>
    );
  }
}

