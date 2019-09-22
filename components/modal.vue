<template>
    <!-- Use a Boolean in v-if to show and hide the modal, Pass Slots to fill the modal -->
    <transition name="modal">
        <div v-if="show" class="modal-mask" :style="{ zIndex }">
            <div class="modal-wrapper" @click="close">
                <div class="modal-container" @click.stop="() => {}" @transitionend="show && $emit('shown')">
                    <div class="modal-header" :class="headerClass">
                        <slot name="header">
                            <div class="inline-block py-1">
                                <span v-if="title">
                                    {{ title }}
                                </span>
                                <slot v-else name="title" />
                            </div>
                            <button type="button" class="close" @click="close" aria-label="Close">
                                <i class="icon icon-circle-close" />
                            </button>
                        </slot>
                    </div>

                    <div class="modal-body" :class="bodyClass">
                        <slot>
                            <!--TODO: Implement default body-->
                        </slot>
                    </div>

                    <div class="modal-footer" v-if="$slots.footer">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
const ESCAPE_KEYCODE = 27;

export default {
  props: {
    zIndex: {
      type: Number,
      default: 9998,
    },

    show: {
      type: Boolean,
      default: true,
    },
    // Optional
    title: {
      type: String,
      default: null,
    },
    headerClass: {
      type: [String, Array, Object],
      default: null,
    },
    bodyClass: {
      type: [String, Array, Object],
      default: null,
    },
    // Use Route hash to handle back button
    disableRouteHash: {
      type: Boolean,
      default: false,
    },
  },

  mounted () {
    this.escapeListener = (e) => {
      try {
        e.keyCode === ESCAPE_KEYCODE && this.close();
      } catch (e) {}
    };
    window.addEventListener('keyup', this.escapeListener);
  },
  beforeDestroy () {
    this._hash != null && this.$router.push({ hash: this._hash, query: this.$route.query });
    window.removeEventListener('keyup', this.escapeListener);
  },
  methods: {
    close () {
      this.$emit('close');
      this.$emit('update:show', false);
    },
  },
};
</script>

<style lang="scss" scoped>
    @import '~vars';

    .modal-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(black, 0.5);

        &.xs .modal-container {
            max-width: 400px;
        }

        &.sm .modal-container {
            max-width: 800px;
        }

        &.md .modal-container {
            max-width: 600px;
        }

        &.lg .modal-container {
            max-width: 1000px;
        }

        &.modal-no-fill {

            .modal-container {
                height: auto;
                width: calc(100% - 30px);
            }

            .modal-container .modal-body {
                min-height: 0;
            }
        }
    }

    .modal-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-container {
        width: 100%;
        max-width: 1100px;
        height: 100%;
        margin: 0 auto;
        background-color: white;
        box-shadow: 0 2px 8px rgba(black, 0.33);
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;

        .modal-body {
            flex: auto 1 1;
            margin: 0;
            padding: 20px 10px;
            overflow: auto;
        }
        @media (min-width: 768px) {
            height: auto;
            max-height: 96%;
            border-radius: 2px;

            .modal-body {
                min-height: unset;
            }
        }

        .close {
            opacity: 1;

            > i {
                font-size: 32px;
                color: $orange;
            }
        }

        &.empty {
            height: auto;
            background-color: transparent;
            box-shadow: none;
            margin: 15px;
            width: auto;
            max-height: 100%;
        }
    }

    .modal-header h3 {
        margin-top: 0;
    }

    /* Animation */

    .modal-enter-active, .modal-leave-active {
        @media (min-width: 768px) {
            transition: opacity 0.3s ease;
        }
    }

    .modal-enter, .modal-leave-to {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-to .modal-container {
        @media (max-width: 767px) {
            opacity: 0;
        }
        @media (min-width: 768px) {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }
</style>
