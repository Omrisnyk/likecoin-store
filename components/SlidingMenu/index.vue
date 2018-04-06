<template>
  <nav class="sliding-menu">
    <div>

      <div class="language-switch-wrapper">
        <language-switch color="white" :isShowLabel="true" />
      </div>

      <div class="social-media-links-wrapper">
        <platform-icon-bar />
      </div>

      <div class="menus-wrapper">
        <div class="menu primary">
          <ul>
            <li v-if="!shouldHideRegister">
              <div class="menu-item highlighted">
                <a @click="onSignUpClick">
                  <span>{{ getButtonText }}</span>
                </a>
              </div>
            </li>
            <li v-if="$route.name !== 'index'">
              <div class="menu-item">
                <nuxt-link to="/">
                  <span>{{ $t('Menu.item.aboutLikeCoin') }}</span>
                </nuxt-link>
              </div>
            </li>
            <li v-if="$route.name !== 'in-tokensale'">
              <div class="menu-item">
                <nuxt-link :to="{ name: 'in-tokensale' }">
                  <span>{{ $t('Menu.item.joinTokenSale') }}</span>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </div>

        <div class="menu secondary">
          <ul>
            <li>
              <div class="menu-item">
                <a href="https://help.like.co/">
                  <span>{{ $t('Menu.item.support') }}</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </nav>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

import PlatformIconBar from '~/components/PlatformIconBar';
import LanguageSwitch from '~/components/LanguageSwitch';

export default {
  name: 'sliding-menu',
  props: [
    'showLogin',
  ],
  components: {
    PlatformIconBar,
    LanguageSwitch,
  },
  computed: {
    getButtonText() {
      if (this.getUserIsRegistered) return this.getUserInfo.user;
      return this.$t(this.showLogin ? 'Home.Header.button.signIn' : 'Home.Header.button.signUp');
    },
    shouldHideRegister() {
      return (
        (!this.getUserIsRegistered && ['in-register', 'in-redeem'].includes(this.$route.name))
        || this.$route.name === 'in-edit'
      );
    },
    ...mapGetters([
      'getUserInfo',
      'getUserIsRegistered',
    ]),
  },
  methods: {
    ...mapActions([
      'showLoginWindow',
    ]),
    onSignUpClick() {
      if (!this.getUserIsRegistered && this.showLogin) {
        this.showLoginWindow();
      } else {
        this.$router.push({
          name: this.getUserIsRegistered ? 'in-edit' : 'in-register',
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import "~assets/variables";

.sliding-menu {

  > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
}

.language-switch-wrapper {
  background-color: $like-green;
  min-height: 52px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 24px;
  color: white;
}

.social-media-links-wrapper {
  background-color: white;
  padding: 10px 24px;

  display: flex;
  justify-content: center;
}

.menus-wrapper {
  border-top: 1px solid $like-green;
  padding: 64px 24px 24px 52px;

  flex-grow: 1;

  @media (max-width: 600px) {
    padding: 32px 24px 24px 32px;
  }

  .menu {
    ul {
      list-style: none;
      margin: -10px;

      li {
        padding: 10px;
      }
    }

    &:not(:first-child) {
      margin-top: 40px;
    }
  }
}

.menu-item {
  font-weight: 300;
  color: $like-green;
  cursor: pointer;

  &:hover {
    > a::before {
      width: 100%;
    }
  }

  &.highlighted {
    font-weight: 600;
  }

  .primary & {
    font-size: 20px;
  }

  .secondary & {
    font-size: 16px;
  }

  > a {
    position: relative;
    text-decoration: none;

    &::before {
      content: " ";
      position: absolute;
      top: calc(100% + 3px);
      left: 0;
      height: 2px;
      background-color: $like-green;
      width: 0%;

      transition: width 0.25s ease-out;
    }
  }
}
</style>