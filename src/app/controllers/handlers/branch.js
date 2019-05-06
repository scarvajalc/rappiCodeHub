const branchHandle = {
  handleHTTPGetAllBranchProducts(req) {
    const branchData = {
      id: req.params.id
    };

    return branchData;
  }
};

module.exports = branchHandle;
