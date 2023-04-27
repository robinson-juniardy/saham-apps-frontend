import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AboutPage from "../pages/about/AboutPage";
import SahamKuartal from "../pages/analisis/saham_kuartal/SahamKuartal";
import HomePage from "../pages/home/HomePage";
import FinancialReport from "../pages/report/financial_report/FinancialReport";
import RingkasanSahamPage from "../pages/ringkasan/saham/RingkasanSaham";

export default function MainRouters() {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="data-pasar">
          <Route path="ringkasan">
            <Route path="ringkasan-saham" element={<RingkasanSahamPage />} />
          </Route>
          <Route path="analisis">
            <Route path="saham-kuartal" element={<SahamKuartal />} />
          </Route>
          <Route path="reports">
            <Route path="financial-report" element={<FinancialReport />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
