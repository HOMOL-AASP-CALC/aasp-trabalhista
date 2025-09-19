<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"> Default Header </slot>
        </header>

        <main class="modal-body" id="modalDescription">
          <slot name="body"> Default body content </slot>
        </main>

        <!-- <footer class="modal-footer"> 
          <button  type="button"   class="btn-open-modal"  @click="close"   aria-label="Close Modal"> OK </button>
        </footer> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: ['largura'],
  methods: {
    close() {
      this.$emit("close");
    },
  }
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 1px 1px 5px 0px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  text-align: left;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid rgb(227, 231, 233);
  color: #000;
  font-weight: bold;
  justify-content: space-between;
}

.modal-footer {
  /* border-top: 1px solid rgb(227, 231, 233); */
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: red;
  background: transparent;
}

.btn-open-modal {
  color: #000;
  background: #eee;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin: 20px auto;
  padding: 6px;
  width: 80px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-open-modal:hover {
  background: #ccc;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
} 
</style>
