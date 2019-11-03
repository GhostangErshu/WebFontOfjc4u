<template>
  <div>
    <!-- <div v-if="false">
            <span class="logo logo-blue">J</span>
            <span class="logo logo-blue">C</span>
            <span class="logo logo-green">4</span>
            <span class="logo logo-red">U</span>
            <span class="logo logo-red">龚</span>
            <span class="logo logo-green">缘</span>
    </div>-->
    <div class="logo-img">
      <img src="../assets/logo.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style>
.logo {
  font-size: 1.6em;
  font-weight: bold;
  font-family: "等线";
}
.logo-blue {
  color: #4285f4;
}
.logo-red {
  color: #e8a935;
}
.logo-green {
  color: #34a853;
}
.logo-img img{
    height: 70px;
    width: auto
}
</style>
