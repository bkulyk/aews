function addMetaData(meta) {
  if (this.meta && this.meta.push) {
    this.meta.push(meta);
  }
}

module.exports = {
  addMetaData,
};
