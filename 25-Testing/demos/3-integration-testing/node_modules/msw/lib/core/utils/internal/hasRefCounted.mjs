function hasRefCounted(value) {
  return typeof Reflect.get(value, "ref") === "function" && typeof Reflect.get(value, "unref") === "function";
}
export {
  hasRefCounted
};
//# sourceMappingURL=hasRefCounted.mjs.map