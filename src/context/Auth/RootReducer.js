export const handleJumlah = (state, action) => {
  if (action.type === "TAMBAH") {
    return { jumlah: state.jumlah + 1 };
  }
  if (action.type === "KURANG") {
    return { jumlah: state.jumlah - 1 };
  }
  return state;
};
