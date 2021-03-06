<template>
  <section class="likecoin-amount-section">
    <div id="likecoin-amount">
      <div :class="['title', 'lc-font-size-14', { 'text-opaque': isOpaque }]">
        {{ amountText || $t('Edit.label.likeCoinAmount') }}
      </div>
      <div
        :class="[
          'value',
          'lc-font-weight-300',
          {
            'text-opaque': isOpaque,
          },
        ]"
      >
        {{ value }}
      </div>

      <a
        :href="LIQUID_LIKEETH_URL"
        class="lc-underline"
        rel="noopener noreferrer"
        target="_blank"
      >{{ $t('Home.Sale.button.tradeAtLiquid') }}</a>
    </div>

    <div
      v-if="(linkHref || linkTo) && linkText"
      class="links"
    >
      <md-button
        v-if="linkTo"
        :to="linkTo"
        class="link md-likecoin lc-text-align-center lc-font-weight-600 shadow"
      >{{ linkText }}</md-button>
      <md-button
        v-else
        :href="linkHref"
        class="link md-likecoin lc-text-align-center"
        rel="noopener noreferrer"
        target="_blank"
      >{{ linkText }}</md-button>
    </div>

    <div
      v-else-if="linkText"
      class="links"
      @click="onClick"
    >
      <md-button class="link md-likecoin">
        <span>{{ linkText }}</span>
      </md-button>
    </div>

  </section>
</template>


<script>
import { LIQUID_LIKEETH_URL } from '@/constant';

export default {
  name: 'like-coin-amount',
  props: {
    value: {
      type: String,
      default: '0.0000',
    },
    isOpaque: {
      type: Boolean,
      default: false,
    },
    linkHref: {
      type: String,
      default: '',
    },
    linkTo: {
      type: Object,
      default: null,
    },
    linkText: {
      type: String,
      default: '',
    },
    amountText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      LIQUID_LIKEETH_URL,
    };
  },
  methods: {
    onClick() {
      this.$emit('onTextClick');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/variables";

#likecoin-amount {
  display: flex;
  align-items: center;
  flex-direction: row;

  padding: 24px 48px;

  border-radius: 8px;
  background-image: linear-gradient(238deg, $like-light-blue, $like-gradient-1);

  @media (max-width: 768px) {
    z-index: 1;

    align-items: center;
    flex-direction: column;

    padding: 24px 8px 48px;

    text-align: center;
  }

  @media (max-width: 600px) {
    border-radius: 0;
  }

  > .title {
    display: flex;

    color: $like-dark-brown-1;

    @media (min-width: 769px) {
      width: 128px;
      min-width: 128px;
      margin-right: 48px;
    }
  }

  > .value {
    flex: 1;

    word-wrap: break-word;

    color: $like-gray-5;

    font-size: 56px;
    line-height: 1;

    @media (max-width: 1024px) {
      font-size: 42px;
    }

    @media (max-width: 768px) {
      margin: 12px 0;

      font-size: 38px;
    }
  }

  .text-opaque {
    opacity: 0.3;
  }
}

.links {
  z-index: 1;

  margin-top: -24px;

  @media (min-width: #{768px + 1px}) {
    align-self: flex-end;

    width: calc(33.33% - 40px);
    margin-right: #{40px + 8px};
  }

  @media (max-width: 768px) {
    align-self: center;

    width: 100%;
    max-width: 320px;
    padding: 0 24px;
  }

  .link {
    margin: 0;

    transition: opacity .2s ease-in-out;

    background-image: linear-gradient(73deg, $like-gradient-2, $like-gradient-3);

    &:not(:first-child) {
      margin-top: 8px;
    }

    &:hover {
      opacity: 0.8;
    }

    > a, span {
      text-decoration: underline;
    }
  }
}

.md-button.md-likecoin {
  width: 100%;
}
</style>
