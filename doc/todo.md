1. Check old header and find how user menu and theme switch auto. right align

2. we have added directly outside --- please check

<Route
element={
<Authenticated
key="authenticated-outer"
fallback={<Outlet />}

> <NavigateToResource />
> </Authenticated>
> }
>
> <Route path="/login" element={<Login />} />
> <Route path="/register" element={<Register />} />
> <Route path="/forgot-password" element={<ForgotPassword />} />
> </Route>

3. <CatchAllNavigate to="/login" /> used instad of <NavigateToResource to="/login" />
