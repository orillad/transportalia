import { useMemo, useState } from "react";
import { mockTransports } from "../mock/data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

export default function TransportsAvuiPage() {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const currentDate = new Intl.DateTimeFormat("ca-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  const programats = mockTransports.filter((t) => t.status === "Programat");
  const iniciats = mockTransports.filter((t) => t.status === "Iniciat");
  const finalitzats = mockTransports.filter((t) => t.status === "Finalitzat");
  const cancellats = mockTransports.filter((t) => t.status === "Cancel·lat");
  const totalPages = Math.max(1, Math.ceil(mockTransports.length / pageSize));
  const paginatedTransports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return mockTransports.slice(start, start + pageSize);
  }, [currentPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Programat":
        return "bg-primary";
      case "Iniciat":
        return "bg-orange-500";
      case "Finalitzat":
        return "bg-green-500";
      case "Cancel·lat":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-6">
      <div className="mb-6 shrink-0 text-gray-600">{currentDate}</div>

      <div className="mb-8 grid shrink-0 grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-primary">
            {programats.length}
          </div>
          <div className="text-sm text-gray-600 mt-2">Programats</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-orange-600">
            {iniciats.length}
          </div>
          <div className="text-sm text-gray-600 mt-2">Iniciats</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-green-600">
            {finalitzats.length}
          </div>
          <div className="text-sm text-gray-600 mt-2">Finalitzats</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-red-600">
            {cancellats.length}
          </div>
          <div className="text-sm text-gray-600 mt-2">Cancel·lats</div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Codi de transport
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Matrícula
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Nom del conductor
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Telèfon
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Origen
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Destí
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Estat
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Incidències
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Km reals
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransports.map((transport, index) => (
              <tr
                key={transport.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 text-sm">{transport.code}</td>
                <td className="px-4 py-3 text-sm">{transport.truck}</td>
                <td className="px-4 py-3 text-sm">{transport.driver}</td>
                <td className="px-4 py-3 text-sm">{transport.driverPhone}</td>
                <td className="px-4 py-3 text-sm">{transport.origin}</td>
                <td className="px-4 py-3 text-sm">{transport.dest}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs text-white ${getStatusColor(transport.status)}`}
                  >
                    {transport.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{transport.incidents}</td>
                <td className="px-4 py-3 text-sm">{transport.kmReals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between text-sm text-gray-600">
        <div>
          Mostrant{" "}
          <span className="font-medium text-gray-900">
            {(currentPage - 1) * pageSize + 1}
          </span>
          {" - "}
          <span className="font-medium text-gray-900">
            {Math.min(currentPage * pageSize, mockTransports.length)}
          </span>{" "}
          de{" "}
          <span className="font-medium text-gray-900">{mockTransports.length}</span>{" "}
          transports
        </div>

        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage((page) => Math.max(1, page - 1));
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(event) => {
                      event.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage((page) => Math.min(totalPages, page + 1));
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
