interface BlocksEmptyProps {
  isFiltered?: boolean;
}

export function BlocksEmpty({ isFiltered = false }: BlocksEmptyProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">
        {isFiltered
          ? "No blocks match your search criteria. Try adjusting your filters."
          : "No blocks available yet. Add some blocks to your registry.json file."}
      </p>
    </div>
  );
}
